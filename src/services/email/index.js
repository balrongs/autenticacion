import EmailService from './email.service';
import EmailHandler from './email.handler';

export default () => {
  const emailService = EmailService();
  const emailHandler = EmailHandler({ emailService });

  return {
    confirm: emailHandler.confirm,
    verify: emailHandler.verify,
  };
};
