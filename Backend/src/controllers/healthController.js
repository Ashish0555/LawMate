const { getDatabaseTime } = require("../services/healthService");

async function getHealthStatus(req, res, next) {
  try {
    const databaseTime = await getDatabaseTime();

    res.status(200).json({
      success: true,
      message: "Server is healthy",
      databaseTime,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getHealthStatus,
};
