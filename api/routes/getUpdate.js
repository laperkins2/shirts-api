const supabase = require('../../supabaseInstance');

const getUpdate = async (request, response, next) => {
  try {
    const { name, description, price, category, instock } = request.body;
    if (!name || !description || !price || !category || !instock) {
      return response
        .status(404)
        .json({ message: 'Please provide all required fields' });
    }

    const updateShirt = {
      name,
      description,
      price,
      category,
      instock,
    };
    const shirtId = request.params.id;

    const { data } = await supabase.patch(
      `/shirts?id=eq.${shirtId}`,
      updateShirt
    );

    // Send updated data back in response
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ message: 'Error updating shirt!', error });
  }
};

module.exports = getUpdate;
