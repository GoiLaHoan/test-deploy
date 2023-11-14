// THESE ARE THE ROLE USER FROM WITHIN DRUPAL
// GRANTED THERE ARE MORE BUT THIS NEEDED TO BE CONSISTENT
export const authorRoles = {
  anonymous: "anonymous",
  administrator: "administrator",
  editor: "editor",
  contributor: "contributor",
  reporter: "reporter",
  audioCurator: "audio_curator",
  videoCurator: "video_curator",
  imageCurator: "image_curator",
};

export type AuthorRolesUnion = keyof typeof authorRoles;
export type AuthorRolesValues = typeof authorRoles[AuthorRolesUnion];
