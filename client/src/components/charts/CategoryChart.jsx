function CategoryChart({ complaints }) {

  const categoryMap = {};

  complaints.forEach((complaint) => {

    const category =
      complaint.category ||
      "Uncategorized";

    categoryMap[category] =
      (categoryMap[category] || 0) + 1;
  });

  const categories =
    Object.entries(categoryMap)
      .map(([name, count]) => ({
        name,
        count,
      }))
      .sort(
        (a, b) =>
          b.count - a.count
      );

  return (
    <div className="chart-card">

      <h2>
        AI Category Distribution
      </h2>

      <div className="category-table">

        {categories.map(
          (item, index) => (

            <div
              key={item.name}
              className="category-row"
            >

              <span>
                {index + 1}. {item.name}
              </span>

              <span>
                {item.count}
              </span>

            </div>
          )
        )}

      </div>

    </div>
  );
}

export default CategoryChart;