const supabase = require('../../supabaseInstance');

const getAdd = async (request, response, next) => {
  try {
    const { name, description, price, category, instock } = request.body;

    if (
      !name ||
      !description ||
      price == null ||
      !category ||
      instock == null
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
    };

    const { data } = await supabase.post('/shirts', newShirt);

    response.status(201).json(data);
  } catch (error) {
    console.error('Supabase Error:', error);
    response.status(500).json({ message: 'Internal Server Error' });
    next(error);
  }
};

module.exports = getAdd;
