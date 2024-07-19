
export const ispasswordmatch = (cnfPassword,password)=>{
    if(cnfPassword && password && password!==cnfPassword){
      return false
    }
    return true
  }

export const isPasswordValid = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  };