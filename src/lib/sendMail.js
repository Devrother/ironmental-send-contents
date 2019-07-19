import nodemailer from 'nodemailer';
import * as aws from 'aws-sdk';

const SES = new aws.SES({
  region: 'us-west-2',
  apiVersion: '2010-12-01',
});

const transporter = nodemailer.createTransport({ SES });

const sendMail = ({
  email,
  subject,
  html,
  from = 'IronMental Manager<no-reply@ironmental.net>',
}) => {
  return transporter.sendMail({
    from,
    to: email,
    subject,
    html,
  });
};

export default sendMail;
