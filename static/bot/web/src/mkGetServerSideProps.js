import {User} from '/api/user';

export default function mkGetServerSideProps({requireLogin}, mk) {
  return async function({req, res, query: {token, ...query}, ...other}) {
    token = token || req.cookies.token || '';
    if (token && (!req.cookies || !req.cookies.token || req.cookies.token !== token)) {
      res.setHeader('set-cookie', 'token=' + token);
    }
    if (!token && requireLogin) {
      return {
        redirect: {
          destination: '/signin?next=' + req.url,
          permanent: false,
        },
      };
    }

    const user = new User({token});
    let userInfo = null;
    if (requireLogin) {
      try {
        userInfo = await user.getInfo();
      } catch (e) {
        userInfo = null;
        return {
          redirect: {
            destination: '/signin?next=' + req.url,
            permanent: false,
          },
        };
      }
    }

    if (mk) {
      const ret = await mk({req, res, user, query, ...other});

      if (ret.redirect) {
        return ret;
      } else {
        const {props, ...otherProps} = ret;
        return {props: {userInfo, token, ...props}, ...otherProps};
      }
    } else {
      return {props: {userInfo, token}};
    }
  };
}
