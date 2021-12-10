import React from "react";

const useVariants = () => {
  const handleVariants = (title) => {
    let variantLines = ''
    if (title !== 'Default Title') {
      if ( title.search('/') < 0) {
        variantLines = title;
      } else {
        
        let variants = title.split(' / ');
        variantLines = [];
        variants.map( (variant) => {
          variantLines.push(variant);
          variantLines.push(<br/>);
        });
      }
    }

    return variantLines;
  }

  return handleVariants;
}

export default useVariants;
