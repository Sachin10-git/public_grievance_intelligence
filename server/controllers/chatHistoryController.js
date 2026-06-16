const ChatHistory =
  require(
    "../models/ChatHistory"
  );

const saveChat =
  async (req, res) => {

    const {
      messages,
      userId,
    } = req.body;

    const history =
      await ChatHistory.create({
        userId,
        messages,
      });

    res.json(history);
};

const getHistory =
  async (req, res) => {

    const history =
      await ChatHistory.find()
        .sort({
          createdAt: -1,
        });

    res.json(history);
};

module.exports = {
  saveChat,
  getHistory,
};