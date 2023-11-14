import classNames from "classnames";
import { useState } from "react";
import { useForm } from "react-hook-form";
import wretch from "wretch";

import styles from "./FeedbackForm.module.scss";

interface FormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const FeedbackForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormInput>();

  const [message, setMessage] = useState<string>(null);

  const onSubmit = (data: FormInput) => {
    const { name, email, subject, message } = data;
    wretch(`${process.env.NEXT_PUBLIC_DRUPAL_URI}/webform_rest/submit`)
      .post({
        webform_id: "feedback",
        name,
        email,
        subject,
        message,
      })
      .res(() => {
        setMessage("Thank you for the feedback!");
      })
      .catch(() => {
        setMessage("Sorry. An error occurred.");
      });
  };

  const nameClassNames = classNames(styles.input, styles.textfield, {
    [styles.error]: errors.name,
  });

  const emailClassNames = classNames(styles.input, styles.textfield, {
    [styles.error]: errors.email,
  });

  const subjectClassNames = classNames(styles.input, styles.textfield, {
    [styles.error]: errors.subject,
  });

  const messageClassNames = classNames(styles.input, styles.textfield, {
    [styles.error]: errors.message,
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.header}>
        <svg
          className={styles.icon}
          width="321"
          height="321"
          viewBox="0 0 321 321"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M288.231 0.333313H32.2307C14.6307 0.333313 0.390713 14.7333 0.390713 32.3333L0.230713 320.333L64.2307 256.333H288.231C305.831 256.333 320.231 241.933 320.231 224.333V32.3333C320.231 14.7333 305.831 0.333313 288.231 0.333313ZM256.231 192.333H64.2307V160.333H256.231V192.333ZM256.231 144.333H64.2307V112.333H256.231V144.333ZM256.231 96.3333H64.2307V64.3333H256.231V96.3333Z"
            fill="#E5B53A"
          />
        </svg>
        <p className={styles.title}>We appreciate your feedback</p>
      </div>
      <input
        className={nameClassNames}
        placeholder="Name"
        {...register("name", { required: true })}
      />
      <input
        className={emailClassNames}
        placeholder="Email"
        type="email"
        {...register("email", { required: true })}
      />
      <input
        className={subjectClassNames}
        placeholder="Subject"
        {...register("subject", { required: true })}
      />
      <textarea
        className={messageClassNames}
        placeholder="Message"
        rows={6}
        {...register("message", { required: true })}
      />
      <div className={styles.actions}>
        <button className={styles.submit} type="submit">
          Submit
        </button>
        {message && <span className={styles.message}>{message}</span>}
      </div>
    </form>
  );
};

export default FeedbackForm;
