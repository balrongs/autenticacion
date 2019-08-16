export default () => {
  const checkMime = {};

  checkMime.validate = (types, mime) => {
    const mimeReq = mime.toLowerCase().split('/');
    let tree = '';
    let type = '';
    let subtype = '';

    const validMime = types.filter(t => {
      tree = t.toLowerCase().split('/');
      type = tree.shift();
      subtype = tree.shift();

      if (subtype === '*' && type !== mimeReq.shift()) return false;
      else if (t.toLowerCase() === mime.toLowerCase()) return false;
      return true;
    });

    return validMime.length > 0;
  };

  return checkMime;
};
