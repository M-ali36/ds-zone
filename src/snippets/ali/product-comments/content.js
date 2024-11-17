function extractProductData() {
  // Extract comments and ratings
  const mainContainer = document.querySelector(".comet-v2-modal-body");
  const commentsWithRatings = [];
  if (mainContainer) {
    const comments = mainContainer.querySelectorAll("div[class^='list--itemReview']");
    comments.forEach(comment => {
      const commentText = comment.textContent.trim();
      const ratingStars = comment.parentElement.querySelectorAll("[class^='stars--box'] path[d^='M463.488']");
      const ratingCount = ratingStars.length;

      commentsWithRatings.push({
        comment: commentText,
        rating: ratingCount
      });
    });
  }

  // Extract store name and link
  const storeElement = document.querySelector("[data-pl='store-name']");
  const storeName = storeElement ? storeElement.textContent.trim() : null;
  const storeLink = storeElement ? storeElement.getAttribute("href") : null;

  // Extract store info
  const storeInfoElement = document.querySelector("div[class^='store-info--desc']");
  const storeInfo = storeInfoElement ? storeInfoElement.textContent.trim() : null;

  // Extract "ship to" info
  const shipToElement = document.querySelector("span[class^='delivery-v2--to']");
  const shipTo = shipToElement ? shipToElement.textContent.trim() : null;

  // Extract shipping descriptions
  const shippingDescListElement = document.querySelector("div[class^='shipping--descList']");
  const shippingDescriptions = [];
  if (shippingDescListElement) {
    const descElements = shippingDescListElement.querySelectorAll("div[class^='shipping--descText']");
    descElements.forEach(descElement => {
      shippingDescriptions.push(descElement.textContent.trim());
    });
  }

  // Extract product price
  const productPriceElement = document.querySelector(".product-price-value");
  const productPrice = productPriceElement ? productPriceElement.textContent.trim() : null;

  // Extract product rating
  const productRatingElement = document.querySelector("a[class^='reviewer--rating'] strong");
  const productRating = productRatingElement ? productRatingElement.textContent.trim() : null;

  // Extract product sold count
  const productSoldCountElement = document.querySelector("span[class^='reviewer--sold']");
  const productSoldCount = productSoldCountElement ? productSoldCountElement.textContent.trim() : null;

  // Extract product attributes
  const productAttributes = [];
  const specificationListElement = document.querySelector("ul[class^='specification--list']");
  if (specificationListElement) {
    const attributeElements = specificationListElement.querySelectorAll("li");
    attributeElements.forEach(attributeElement => {
      const titleElement = attributeElement.querySelector("div[class^='specification--title']");
      const valueElement = attributeElement.querySelector("div[class^='specification--desc']");
      if (titleElement && valueElement) {
        productAttributes.push({
          title: titleElement.textContent.trim(),
          value: valueElement.textContent.trim()
        });
      }
    });
  }

  // Extract product descriptions
  const productDescriptionElement = document.querySelector("#product-description");
  const productDescription = productDescriptionElement ? productDescriptionElement.textContent.trim() : null;

  // Extract count of users who liked this product
  const usersLikedElement = document.querySelector("span[class^='share-and-wish--wishText']");
  const usersLikedCount = usersLikedElement ? usersLikedElement.textContent.trim() : null;

  // Extract page URL without query parameters
  const pageUrl = `${window.location.origin}${window.location.pathname}`;

  // Combine all data
  const extractedData = {
    productLink: pageUrl, // Add the clear URL without query parameters
    store: {
      name: storeName,
      link: storeLink,
      info: storeInfo
    },
    shipTo: shipTo,
    shippingDescriptions: shippingDescriptions,
    product: {
      price: productPrice,
      rating: productRating,
      soldCount: productSoldCount,
      attributes: productAttributes,
      description: productDescription,
      usersLikedCount: usersLikedCount
    },
    comments: commentsWithRatings
  };

  return JSON.stringify(extractedData, null, 2);
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "extractComments") {
    const extractedData = extractProductData();
    sendResponse({ extractedData });
  }
});
