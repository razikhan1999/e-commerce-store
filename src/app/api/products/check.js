// try {
  //   let whereClause = {};

  //   // Filter by query
  //   if (query) {
  //     whereClause.OR = [
  //       {
  //         name: {
  //           contains: query,
  //         },
  //       },
  //     ];
  //   }

  //   // Filter by categories
  //   if (categories) {
  //     const categoryArray = categories.split(',').map(Number);
  //     whereClause.categoryId = {
  //       in: categoryArray,
  //     };
  //   }

  //   // Filter by price ranges
  //   if (priceRanges) {
  //     const priceRangeArray = priceRanges.split(',');
  //     const priceRangeConditions = priceRangeArray.map(range => priceRangeMapping[range]);
  //     if (priceRangeConditions.length > 0) {
  //       if (!whereClause.OR) {
  //         whereClause.OR = [];
  //       }
  //       whereClause.OR.push(...priceRangeConditions.map(condition => {
  //         const priceCondition = {
  //           price: {
  //             gte: condition.gte,
  //           },
  //         };
  //         if (condition.lte !== null) {
  //           priceCondition.price.lte = condition.lte;
  //         }
  //         return priceCondition;
  //       }));
  //     }

  //   }
  //   const resp = await prisma.product.findMany({
  //     where: whereClause,
  //   });

  //   return NextResponse.json({ data: resp, status: 200 });
  // } catch (error) {
  //   console.error('Error fetching products:', error);
  //   return NextResponse.error('Failed to fetch products', { status: 500 });
  // }
