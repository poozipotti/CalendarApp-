
window.onload = (event) => {
  const characters = [];
  console.log('initialized')
  const validCodeElements = Array.from(document.getElementsByTagName('code'))
    .filter(checkFilterAttr(/23.*/g,'data-class'))
  console.log(validCodeElements)

  const validDivElements = getFirstChildByTag(validCodeElements,'div')
    .filter(checkFilterAttr(/.*93/g,'data-tag'))
  console.log(validDivElements)

  const validSpanElements = getFirstChildByTag(validDivElements,'span')
    .filter(checkFilterAttr(/.*21.*/g,'data-id'))
  console.log(validSpanElements)

  const validChars = getFirstChildByTag(validSpanElements,'i')
    .map(element=> element.getAttribute("value")) 

  console.log(validChars.join(''));
}


function getFirstChildByTag(elementArray,tag) {
  const elementChildren = elementArray.reduce(
    (allChildren,element)=>[
      ...allChildren,
      ...element.getElementsByTagName(tag)
    ],[])
  console.log(elementChildren)
  return elementChildren
  
}
function checkFilterAttr(regex,attributeName) {
  return (element) => {
    const attrVal = element.getAttribute(attributeName);
    if(!attrVal) {
      return false;
    }
    const matches = attrVal.match(regex);
    return matches && matches[0] == attrVal;
  }
}




