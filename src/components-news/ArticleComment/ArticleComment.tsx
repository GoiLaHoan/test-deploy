import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputWithValidation from "~/src/components/LayoutAdvertising/InputWithValidation/InputWithValidation";
import styles from "./ArticleComment.module.scss";
import {
  BiBell,
  BiDotsHorizontalRounded,
  BiLike,
  BiDislike,
} from "react-icons/bi";
import { AuthorImage } from "~/src/components/image-with-fallback/image-with-fallback.component";
import clsx from "clsx";
import dayjs from "dayjs";
import Comment from "./Comment";

const schema = yup.object().shape({
  message: yup.string().required("Please enter your message.").min(1),
});

interface IFormInput {
  message: string;
}

interface ArticleCommentProps {
  user_id: string;
  user_name: string;
  user_avatar: string;
  created_at: Date;
  message: string;
}

const ArticleComment = () => {
  const MESSAGES: ArticleCommentProps[] = [
    {
      user_id: "1",
      user_name: "olivecupcake644",
      user_avatar: "",
      created_at: new Date(),
      message: `I'm starting to wonder i fAlfonso has the real gold confused with the paper gold one !
      I realize that the paper one did set the value for real gold for a long time, but that could change!
      Gold and silver are real safe haven assets!
      `,
    },
    {
      user_id: "2",
      user_name: "Bill sundling",
      user_avatar: "",
      created_at: new Date(),
      message: `I'm starting to wonder i fAlfonso has the real gold confused with the paper gold one !
      I realize that the paper one did set the value for real gold for a long time, but that could change!
      Gold and silver are real safe haven assets!
      `,
    },
    {
      user_id: "3",
      user_name: "jj_",
      user_avatar: "",
      created_at: new Date(),
      message: `Well the fed hiked rates aggressively all through the 70's what happened to gold then?
      `,
    },
    {
      user_id: "4",
      user_name: "Raphinha",
      user_avatar: "",
      created_at: new Date(),
      message: `Well the fed hiked rates aggressively all through the 70's what happened to gold then?
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
      It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      `,
    },
  ];

  return (
    <div>
      <aside className="mb-6">
        <h3 className="text-lg border-b border-ktc-borders pb-3 mb-2">
          Conversation
          <span className="ml-4 text-sm">78 Comments</span>
        </h3>
        <CommentAuth />
        <CommentForm />
        <CommentFilter />
        <div>
          <CommentList messages={MESSAGES} />
          <button className="py-2 px-3 bg-[#e5b53a] rounded-lg font-bold text-white">
            SHOW MORE COMMENTS
          </button>
        </div>
      </aside>
    </div>
  );
};

export default ArticleComment;

const CommentAuth = () => {
  return (
    <div className="flex items-center flex-row-reverse">
      <button>Sign up</button>
      <span className="mx-1">|</span>
      <button>Login</button>
      <button className="mr-4">
        <BiBell />
      </button>
    </div>
  );
};

const CommentFilter = () => {
  return (
    <div className="action-filter mt-3 mb-4">
      Sort by
      <select name="sort" className="bg-transparent font-bold">
        <option value="newest">Newest</option>
      </select>
    </div>
  );
};

const CommentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const submitForm = (data: IFormInput) => {
    console.log(data);
  };

  return (
    <div className="mt-2">
      <form onSubmit={handleSubmit(submitForm)} noValidate>
        <div className={styles.formField}>
          <InputWithValidation
            name="message"
            placeholder="What do you think?"
            errors={errors}
            register={register}
          />
        </div>
      </form>
    </div>
  );
};

const CommentList = ({ messages }) => {
  return (
    <div className="list-message">
      {messages?.map((item: ArticleCommentProps, idx: number) => {
        return (
          <div
            key={idx}
            className={clsx(
              "flex mb-4 pb-2 justify-between",
              messages.length - 1 !== idx ? "border-b border-gray" : "",
            )}
          >
            <AuthorImage
              src={"/fallbacks/ktc_img_fallback_sm.jpg"}
              className="rounded-full h-10 w-10 object-cover mr-4"
              style={{
                zIndex: 100,
              }}
            />
            <div className="flex-grow">
              <h3 className="flex items-center font-bold">
                {item?.user_name}
                <span className="block w-[5px] h-[5px] rounded-full bg-[#d7d7d7] mx-2"></span>
                <p className="text-sm text-[#a2a2a2] font-normal">
                  {dayjs(item?.created_at).format("MMM D, YYYY")}
                </p>
              </h3>
              <Comment text={item?.message} threshold={4} />
              <div className="comment-action flex item-center gap-3">
                <button>Reply</button>
                <button>
                  <BiLike />
                </button>
                <button>
                  <BiDislike />
                </button>
              </div>
            </div>
            <div className="mr-1">
              <BiDotsHorizontalRounded
                size={20}
                color="gray"
                className="hover:cursor-pointer"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
