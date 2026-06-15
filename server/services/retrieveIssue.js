const issues =
  require("../knowledgebase/issues.json");

const retrieveIssue = (
  title,
  description
) => {

  const text =
    `${title} ${description}`
      .toLowerCase();

  for (const issue of issues) {

    const matched =
      issue.keywords.some(
        (keyword) =>
          text.includes(
            keyword.toLowerCase()
          )
      );

    if (matched) {

      return {
  category:
    issue.category,

  priority:
    issue.priority,

  department:
    issue.department,

  recommendedAction:
    issue.recommendedAction,
};
    }
  }

  return null;
};

module.exports = {
  retrieveIssue,
};