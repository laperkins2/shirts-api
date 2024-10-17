const supabase = require('../../supabaseInstance');

const getUpdate = async (request, response, next) => {
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

    const updateShirt = {
      name,
      description,
      price,
      category,
      instock,
      quantity,
      image_url,
    };
    const shirtId = request.params.id;

    const { data, error } = await supabase.patch(
      `/shirts?id=eq.${shirtId}`,
      updateShirt
    );
    if (error) {
      return response.status(404).json({ message: 'Shirt not found' });
    }

    // Send updated data back in response
    response.status(200).json(data);
  } catch (error) {
    console.error('Error updating shirt!:', error);
    next(error);
  }
};

module.exports = getUpdate;
