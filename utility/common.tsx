export const getDisplayName = (name:string|undefined) => {
  if(name) {
    const splittedName = name.split('-');
    if(splittedName.length>1) {
      let label = '';
      for(let i=0;i<splittedName.length;i++) {
        label += splittedName[i] + ' ';
      }
      return label;
    }
    if(splittedName.length===1) return splittedName[0];
  }
  return "Unknown";
};

export const getShortDisplayName = (name:string|undefined) => {
  if(name) {
    const splittedName = name.split('-');
    return(splittedName[0]);
  }
  return '';
};
