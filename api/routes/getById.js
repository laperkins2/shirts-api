const supabase = require('../../supabaseInstance');

const getById = async (request, response, next) => {
  try {
    const res = await supabase.get(`/shirts?id=eq.${request.params.id}`);
    if (!res.data.length) {
      return response.status(404).json({ message: 'Shirts does"nt exist!' });
    }
    response.json(res.data[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
