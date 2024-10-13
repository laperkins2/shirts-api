const supabase = require('../../supabaseInstance');

const getDelete = async (request, response, next) => {
  try {
    const res = await supabase.delete(`/shirts?id=eq.${request.params.id}`);
    if (res.error) {
      return response.status(404).json({ message: 'Shirt not found' });
    }
    response
      .status(200)
      .json({ message: 'Shirt deleted successfully', data: res.data });
  } catch (error) {
    console.error('Delete Error:', error);
    next(error);
  }
};

module.exports = getDelete;
