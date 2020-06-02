import Sendsay from "sendsay-api";

class SendsayProxy {

  login0({login, sublogin, password}) {
    this.sendsay = new Sendsay({auth: {login, sublogin, password}});
//  const dispatch = useDispatch();

    return this.sendsay.request({ action: 'sys.settings.get', list: ['about.id']})
      .then(res => {
        console.log("login() res=", res);
        //console.log(res.list['about.id']);
        console.log(document.cookie);
        return {aboutId: res.list['about.id']};
      })
      .catch(error => {
        console.error('At api login request(): ',error);
        this.sendsay = false;
        return {errorObj: error};
      });
  }

  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  login({login, sublogin, password}) {
    this.sendsay = new Sendsay();
    return this.sendsay.login({login, sublogin, password})
      .then(res => {
        console.log('AFTER LOGIN sendsay=', this.sendsay);
        console.log("login() res=", res);
        this.setCookie('sendsay_session', this.sendsay.session, 1);
        //console.log(res.list['about.id']);
        console.log(document.cookie);
        return "login OK";
       })
      .catch(error => {
        console.error('At api login request(): ',error);
        this.sendsay = false;
        return {errorObj: error};
      });
  }

  getSendsay() {
    if (this.sendsay) {
      return this.sendsay;
    }
    let sendsay = new Sendsay();
    sendsay.setSessionFromCookie();
    console.log("getSendsay() sendsay=", sendsay);
 /*   if (sendsay.session) {
      this.sendsay = sendsay;
    } else {
      sendsay = false;
    }
*/    return sendsay;
  }

  test() {
    const sendsay = this.getSendsay();
    if (sendsay){
      this.sendsay = sendsay;
      return this.request({ action: 'sys.settings.get', list: ['about.id']})
        .then(res => {
          console.log("test.res = ", res);
          return res;
        });
      /*
            return sendsay.request({action: "pong"})
              .then(res => {
                console.log("pong.res = ", res);
                return {account: res.account, sublogin: res.sublogin};
              });
      */
    } else {
      return Promise.reject(new Error('Нет сессии'));
    }
  }

  pong() {
    const sendsay = this.getSendsay();
    if (sendsay){
      this.sendsay = sendsay;
      return this.request({action: "pong"})
        .then(res => {
          console.log("pong.res = ", res);
          return {account: res.account, sublogin: res.sublogin};
        });
/*
      return sendsay.request({action: "pong"})
        .then(res => {
          console.log("pong.res = ", res);
          return {account: res.account, sublogin: res.sublogin};
        });
*/
    } else {
      return Promise.reject(new Error('Нет сессии'));
    }
  }

  request(req) {
    return this.sendsay.request(req)
      .then(res => {
        console.log("sendsay.request() res=", res);
        return res;
      })
      .catch (error => {
        console.error('At api request request(): ',error);
        return {errorObj: error};
      });
  }
}

export const sendsayProxy = new SendsayProxy();