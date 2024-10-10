const supabase = require('../../supabaseInstance');

const getDelete = async (request, response, next) => {
  try {
    const res = await supabase.delete(`/shirts?id=eq.${request.params.id}`);

    response.status(200).json(res.data);
  } catch (error) {
    next(error);
  }
};

module.exports = getDelete;
