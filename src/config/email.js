const EMAIL_CONFIG = {
  CONNECTION: {
    pool: true,
    host: process.env.AUTH_EMAIL_HOST || 'localhost',
    port: process.env.AUTH_EMAIL_PORT,
    secure: process.env.NODE_ENV === 'production',
    auth: {
      user: process.env.AUTH_EMAIL_USER,
      pass: process.env.AUTH_EMAIL_PASSWORD,
    },
  },
  FROM: `"${process.env.AUTH_EMAIL_NAME}" <${process.env.AUTH_EMAIL_USER}>`,
  CONFIRM_SUBJECT: '[Montt] Confirmar email',
  RESET_SUBJECT: '[Montt] Reiniciar contraseña',
  CONFIRM_CALLBACK: process.env.AUTH_CONFIRM_CALLBACK,
  RESET_CALLBACK: process.env.AUTH_RESET_CALLBACK,
};

export default EMAIL_CONFIG;
