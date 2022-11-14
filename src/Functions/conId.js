function conId (size = 10){
  if(typeof size !== 'number' || !isFinite(size)){
    size = 10;
  }
  if (size < 0 || size > 10){
    size = 1;
  }
  let str='';
  if(size < 4){
  str= 'ZXCVBNMLKJHGFDSAQWERTYUIOP';
  }else{
  str='789654123';
  }
  let res='';

  while(size--){
    res += str[Math.floor(Math.random()*str.length)];
  }
  return res;
}

export default conId;