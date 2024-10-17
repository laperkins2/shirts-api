const supabase = require('../../supabaseInstance');

const getAdd = async (request, response, next) => {
  try {
    const { name, description, price, category, instock, quantity, image_url } =
      request.body;

    if (
      !name ||
      !description ||
      price == null ||
      !category ||
      instock == null ||
      quantity == null ||
      !image_url == null
    ) {
      return response
        .status(400)
        .json({ message: 'Please provide all required fields' });
    }
    const newShirt = {
      // id: SHIRTS.length + 1,
      name,
      description,
      price,
      category,
      instock,
      quantity,
      image_url,
    };

    const { data, error } = await supabase.post('/shirts', newShirt);

    if (error) {
      console.error('Error adding shirt:', error);
      return response.status(500).json({ message: 'Internal Server Error' });
    }

    response.status(201).json(data);
  } catch (error) {
    console.error('Supabase Error:', error);
    response.status(500).json({ message: 'Internal Server Error' });
    next(error);
  }
};

module.exports = getAdd;
