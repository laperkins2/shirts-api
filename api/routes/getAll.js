const supabase = require('../../supabaseInstance');

const cache = {};

const getAll = async (request, response, next) => {
  try {
    if (cache.shirts) {
      return response.json(cache.shirts);
    }

    const res = await supabase.get('/shirts');
    cache.snacks = res.data;
    response.json(res.data);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
