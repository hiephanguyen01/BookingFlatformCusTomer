export const compareItemChooseServiceListWithCartItem = (
  chooseServiceList,
  post
) => {
  /**
   * Description: check based on id of cart item
   *
   * Params: chooseServiceList <list <object> >,  post <object>: cart item
   *
   * Return boolean
   */
  if (chooseServiceList.length === 0 || post?.Services.length === 0)
    return false;
  let result = chooseServiceList.reduce((acc, curr) => {
    let temp = post.Services.some((item) => {
      return item?.Category === curr?.Category && item?.id === curr?.id;
    });
    if (temp) return [...acc, curr];
    return acc;
  }, []);
  if (result.length === post.Services.length) return true;
  return false;
};

export const checkIfChosenServiceExistInCurrentListInRedux = (
  chooseServiceList,
  currentPost
) => {
  /**
   * Description: check based on id of cart item
   *
   * Params: post <object>: cart item
   *
   * Return array: Falsy || Truthy
   */
  let existedItemIndex = -1;
  if (chooseServiceList.length === 0) return [];
  let result = chooseServiceList.every((value, index) => {
    if (
      value?.Category === currentPost?.Category &&
      value?.id === currentPost?.id
    ) {
      existedItemIndex = index;
      return false;
    }
    return true;
  });
  return existedItemIndex > -1 ? [existedItemIndex] : [];
};

export const checkIfChosenServiceDifferentFromCurrentList = (
  chooseServiceList,
  currentService
) => {
  let result = chooseServiceList.every(
    (item) => item.Category === currentService.Category
  );

  return !result;
};
