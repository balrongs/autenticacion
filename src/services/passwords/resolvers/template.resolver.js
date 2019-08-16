export default () => {
  const template = {};

  template.info = (config, token, callback) => {
    const url = `${callback}/${token}`;
    return {
      form: config.from,
      to: config.to,
      subject: config.subject,
      text: `Copia y pega la siguente URL en tu navegador: ${url}`,
      html: `
        <p>Para reiniciar tu contraseña has click <a href="${url}">Aquí</a></p>
        Copia y pega la siguente URL en tu navegador: ${url}
      `,
    };
  };

  return template;
};
