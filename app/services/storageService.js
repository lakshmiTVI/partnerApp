export let tokenName = 'VitualDoctorToken';
export const serverURL="https://rpm.televital.net:60001/usvirtualdoctor/rest";

export function storeData(key, data) {
    localStorage.setItem(key, data);
  }
  export function  getData(key) {
    return localStorage.getItem(key);
  }

  export function  getJwtToken() {
    return localStorage.getItem(this.tokenName);
  }

  export function setJwtToken(tokenString) {
    localStorage.setItem(this.tokenName, tokenString);
  }

  export function clearStorage() {
    localStorage.clear();
  }