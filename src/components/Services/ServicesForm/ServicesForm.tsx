import type { FC } from "react";
import * as yup from "yup";
import cs from "~/src/utils/cs";
import wretch from "wretch";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import styles from "./ServicesForm.module.scss";
import PrivacyText from "~/src/components/Services/PrivacyText/PrivacyText";
import InputWithValidation from "~/src/components/Services/InputWithValidation/InputWithValidation";
import useScreenSize from "~/src/utils/useScreenSize";
import {
  CHANNELS,
  SERVICE_STATUS,
  ServicesType,
} from "~/src/utils/useSubscriptions";

interface Props {
  services: ServicesType;
  setServices: (args: ServicesType) => void;
  urlRedirect: any;
  completeSub: boolean;
  loading: boolean;
  setLoading: (...args: any) => void;
  setMessage: (...args: any) => void;
  handleDiscardSelection: (event: React.MouseEvent<HTMLElement>) => void;
  handleStepComplete: (event: React.MouseEvent<HTMLElement>) => void;
}

interface IFormInput {
  name: string;
  email: string;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please specify your name.")
    .min(2, "Please specify your name."),
  email: yup
    .string()
    .required("We need your email address to contact you.")
    .email("Please enter a valid email address."),
});

const ServicesForm = ({
  services,
  setServices,
  loading,
  urlRedirect,
  completeSub,
  setLoading,
  setMessage,
  handleDiscardSelection,
  handleStepComplete,
}: Props) => {
  const router = useRouter();
  const { isMobile } = useScreenSize();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const servicesID = () => {
    const arrKey = [];
    for (const [key, value] of Object.entries(services)) {
      if (value == SERVICE_STATUS.select) arrKey.push(key);
    }

    return arrKey.map((channel) => CHANNELS[channel]).toString();
  };

  const servicesSelected = () => {
    const servicesNew = { ...services };
    for (const [key, value] of Object.entries(servicesNew)) {
      if (value == SERVICE_STATUS.select)
        servicesNew[key] = SERVICE_STATUS.selected;
    }

    return servicesNew;
  };

  const countSelect = () => {
    const arrChecked = [];
    for (const [key, value] of Object.entries(services)) {
      if (value == SERVICE_STATUS.select) arrChecked.push(key);
    }

    return arrChecked.length;
  };

  const submitForm = (data: IFormInput) => {
    const dataSubmit = {
      sourceId: 14,
      channels: servicesID(),
      email: data.email,
      urlSafeEmail: encodeURIComponent(data.email),
      ipAddress: "IP",
    };
    setLoading(true);
    wretch(`/api/subscribe/services`)
      .headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      })
      .post({ ...dataSubmit })
      .res((res) => {
        if (res && res.status == 200) {
          setMessage({
            msg: "Thank you for subscribing",
            isSuccess: true,
          });
          setServices(servicesSelected());
          localStorage.setItem(
            "KITCO_CHANNELS",
            JSON.stringify(servicesSelected()),
          );
          setTimeout(() => {
            setLoading(false);
          }, 3000);
          if (urlRedirect) router.push(urlRedirect);
        }
      })
      .catch(() => {
        setLoading(false);
        setMessage({
          msg: "Server error",
          isSuccess: false,
        });
      });
  };

  if (isMobile && completeSub) {
    return (
      <div>
        <div className={cs([styles.itemSelected, "text-center lg:hidden"])}>
          {countSelect()} newsletter{countSelect() > 1 ? "s" : ""} selected
        </div>
        <div
          className={cs(["text-center", styles.buttonSignUp])}
          onClick={handleStepComplete}
        >
          Complete subscription
        </div>
      </div>
    );
  }

  return (
    <form action="" onSubmit={handleSubmit(submitForm)}>
      {urlRedirect && (
        <div
          className={cs([
            styles.textConfirm,
            "text-center mx-auto w-full lg:w-[75%]",
          ])}
        >
          You are about to navigate to another page, would you like to complete
          your subscription for the selected newsletters before proceeding ?
        </div>
      )}
      <div className="flex mb-8 gap-7 flex-col lg:flex-row lg:items-center">
        <div className="w-full lg:w-7/12">
          {!urlRedirect && (
            <>
              <p className={cs([styles.formLabel, "hidden lg:block"])}>
                Enter your name and email address to receive the selected
                newsletters.
              </p>
              <div
                className={cs([styles.itemSelected, "text-center lg:hidden"])}
              >
                {countSelect()} newsletter{countSelect() > 1 ? "s" : ""}{" "}
                selected
              </div>
            </>
          )}
          <div className="flex gap-x-8 flex-col lg:flex-row gap-y-2.5 lg:gap-y-0">
            <InputWithValidation
              name="name"
              placeholder="Name"
              errors={errors}
              register={register}
            />
            <InputWithValidation
              name="email"
              placeholder="Email"
              errors={errors}
              register={register}
            />
          </div>
        </div>
        <div
          className={cs([
            "w-full lg:w-5/12 text-center grow",
            urlRedirect && styles.noneAuto,
          ])}
        >
          <ButtonActionForm
            loading={loading}
            url={urlRedirect}
            count={countSelect()}
            handleDiscard={handleDiscardSelection}
          />
        </div>
      </div>
      <PrivacyText />
    </form>
  );
};

export default ServicesForm;

const ButtonActionForm: FC<{
  loading?: boolean;
  url: any;
  count: number;
  handleDiscard: (event: React.MouseEvent<HTMLElement>) => void;
}> = ({ url, count, handleDiscard, loading }) => {
  return (
    <>
      {!url && (
        <div className={cs([styles.itemSelected, "hidden lg:block"])}>
          {count} newsletter{count > 1 ? "s" : ""} selected
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className={cs([
          styles.buttonSignUp,
          loading && "!cursor-not-allowed opacity-60",
        ])}
      >
        {!loading ? "Sign Up" : "Submitting..."}
      </button>
      {url && (
        <div className={styles.stepConfirm}>
          <span>OR</span>
          <div className={styles.btnDiscard} onClick={handleDiscard}>
            Discard Selection
          </div>
        </div>
      )}
    </>
  );
};
