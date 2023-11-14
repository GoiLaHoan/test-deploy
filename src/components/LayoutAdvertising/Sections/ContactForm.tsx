import { FC, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Reaptcha from "reaptcha";
import { yupResolver } from "@hookform/resolvers/yup";
import wretch from "wretch";
import * as yup from "yup";
import InputWithValidation from "../InputWithValidation/InputWithValidation";
import { env } from "~/src/env/client.mjs";

interface IFormInput {
  fname: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
}

interface IMessage {
  msg: string;
  isSuccess: boolean;
}

const schema = yup.object().shape(
  {
    fname: yup
      .string()
      .required("Please specify your first name.")
      .min(2, "Please specify your first name."),
    name: yup
      .string()
      .required("Please specify your name.")
      .min(2, "Please specify your name."),
    email: yup
      .string()
      .required("We need your email address to contact you.")
      .email("Please enter a valid email address."),
    phone: yup
      .string()
      .nullable()
      .notRequired()
      .when("phone", {
        is: (value: string) => value?.length,
        then: (rule) => rule.min(7, "Please enter at least 7 characters."),
      }),
    message: yup.string().required("Please enter your message.").min(1),
  },
  [["phone", "phone"]],
);

const ContactForm: FC = () => {
  const [infoContact, setInfoContact] = useState<IFormInput>();
  const [message, setMessage] = useState<IMessage>({
    msg: "",
    isSuccess: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const captcha = useRef<Reaptcha>(null);

  const encryptLong = async (str: string) => {
    const JSEncrypt = (await import("jsencrypt")).default;
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(env.NEXT_PUBLIC_KEY_ENCRYPT);

    const maxChunkLength = 100;
    let output = "";
    let inOffset = 0;

    while (inOffset < str.length) {
      output += encryptor.encrypt(
        str.substring(inOffset, inOffset + maxChunkLength),
      );
      inOffset += maxChunkLength;
    }
    return output;
  };

  const onVerify = async (token: string) => {
    if (token && infoContact) {
      const stringToEncrypt = JSON.stringify(infoContact);
      const encryptedData = await encryptLong(stringToEncrypt);

      wretch(`${env.NEXT_PUBLIC_URL_CLOUDFLARE}/send_contact`)
        .post({
          data: encryptedData,
        })
        .res(() => {
          setMessage({
            msg: "Thank you for contacting us. One of our representatives will contact you within 48 hours.",
            isSuccess: true,
          });
        })
        .catch(() => {
          setMessage({
            msg: "Your message could not be submitted at this time. Please try again.",
            isSuccess: false,
          });
        });
    }
    captcha.current?.reset();
  };

  const submitForm = (data: IFormInput) => {
    captcha.current?.execute();
    setInfoContact(data);
  };

  const ShowMsg = (): JSX.Element => {
    let show = "";
    if (message?.msg) {
      show = "!flex";
      setTimeout(() => {
        show = "";
        setMessage({
          msg: "",
          isSuccess: false,
        });
      }, 2000);
    }

    return (
      <div
        className={`row ${
          message?.isSuccess ? `successForm ${show}` : `errorForm ${show}`
        }`}
      >
        <div className="col">
          <p>{message?.msg}</p>
        </div>
      </div>
    );
  };

  return (
    <section
      id="contact"
      className="section d-flex align-items-center text-center"
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>
              <strong>CONTACT</strong> US{" "}
            </h2>
            <div className="row">
              <div className="col-12 col-lg-6">
                Fill out the form below to send us a message. <br />
                <strong>We will get back to you as soon as possible.</strong>
              </div>
              <div className="col-12 col-lg-6 phone-block">
                Or call us
                <strong
                  id="phone-num"
                  style={{ fontSize: "2em" }}
                  className="theme-colored "
                >
                  <a style={{ fontSize: "30px" }} href="tel:18555854826">
                    1 855 585-4826
                  </a>
                </strong>
              </div>
            </div>
          </div>
          <div className="col-12">
            <form
              id="contact-form"
              className="mailing-list text-left"
              method="post"
              onSubmit={handleSubmit(submitForm)}
              noValidate
            >
              <input type="hidden" name="subject" value="Advertising" />
              <div className="row">
                <div className="col-12 col-md-6 form__field">
                  <InputWithValidation
                    name="fname"
                    placeholder="FIRST NAME*"
                    errors={errors}
                    register={register}
                  />
                </div>
                <div className="col-12 col-md-6 form__field">
                  <InputWithValidation
                    name="name"
                    placeholder="LAST NAME*"
                    errors={errors}
                    register={register}
                  />
                </div>
                <div className="col-12 col-md-6 form__field">
                  <InputWithValidation
                    type="email"
                    name="email"
                    placeholder="EMAIL*"
                    errors={errors}
                    register={register}
                  />
                </div>
                <div className="col-12 col-md-6 form__field">
                  <InputWithValidation
                    name="phone"
                    placeholder="PHONE"
                    errors={errors}
                    register={register}
                  />
                </div>
                <div className="col-12 form__field">
                  <textarea
                    rows={4}
                    placeholder="MESSAGE*"
                    {...register("message")}
                  />
                  {errors.message && (
                    <label className="error">{errors?.message?.message}</label>
                  )}
                </div>
              </div>
              <Reaptcha
                ref={captcha}
                sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}
                size={"invisible"}
                onVerify={onVerify}
              />
              <div className="row">
                <div className="col text-center">
                  <button
                    style={{ margin: "0 auto" }}
                    type="submit"
                    name="contact-send"
                    id="contact-submit"
                    className="button"
                  >
                    SEND
                  </button>
                </div>
              </div>
              <ShowMsg />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
