import { useCallback, useEffect, useRef } from "react";
import videojs from "video.js";
import { env } from "~/src/env/client.mjs";
// @ts-ignore
import offset from "videojs-offset";

type UseVideoPlayerArgs = {
  startTime: number;
  endTime: number;
  /** aka video { uuid }  **/
  snippetUuid?: string;
  /** image assigned to video within the VCMS  **/
  thumbnailUuid?: string;
  /** a URL assigned by Drupal for featured content **/
  overlayImageUrl?: string;
  /** uuid for VCMS bucket **/
  assetUuid: string;
  assetType: "video" | "audio" | string;

  manuallyCreateParentNodes?: boolean;
};

export function useVideoPlayer({
  single,
  multiple = [],
}: {
  single?: UseVideoPlayerArgs;
  multiple?: UseVideoPlayerArgs[];
}) {
  const videoNode = useRef<HTMLVideoElement>();
  const playerRef = useRef<videojs.Player>();

  const createVideoDOM = useCallback(
    (x: UseVideoPlayerArgs) => {
      const parent = document.querySelectorAll(
        `[data-snippet-uuid="${x?.snippetUuid}"]`,
      );
      const posterUrl = `${env.NEXT_PUBLIC_IMAGES_CDN_API}/img/_/vcms/${x.snippetUuid}/${x.thumbnailUuid}_poster.jpeg`;
      parent[0].innerHTML = `
        	<div style="position: relative; padding-bottom: 56.25%; height: 0; display: block;">
        			<video
                id="${x.snippetUuid}"
                class="video-js videoPlayerEmbedded"
                controls
        				preload="auto"
                poster="${posterUrl}"
        			>
        				<source src="${env.NEXT_PUBLIC_VCMS_BUCKET}/${x.assetUuid}/video.mp4" type="video/mp4" />
        				<p class="vjs-no-js">
        					To view this video please enable JavaScript
        				</p>
        			</video>
        	</div>
    `;
    },
    [
      ...multiple?.map(
        ({ manuallyCreateParentNodes }) => manuallyCreateParentNodes,
      ),
      ...multiple?.map(({ snippetUuid }) => snippetUuid),
      ...multiple?.map(({ assetUuid }) => assetUuid),
    ],
  );

  const createAudioDOM = useCallback(
    (x: UseVideoPlayerArgs) => {
      const parent = document.querySelectorAll(
        `[data-snippet-uuid="${x?.snippetUuid}"]`,
      );
      parent[0].innerHTML = `
			<div style="position: relative; height: 54px; display: block; margin: 2em 0;" data-vjs-player>
					<audio
						id="${x.snippetUuid}"
						class="video-js videoPlayerEmbedded"
						controls
						preload="auto"
						style="background-color: transparent"
					>
						<source src="${env.NEXT_PUBLIC_ACMS_BUCKET}/${x.assetUuid}/asset.m4a" type="audio/mp4" />
						<p class="vjs-no-js">
							To listen to this audio please enable JavaScript
						</p>
					</audio>
			</div>
    `;
    },
    [
      ...multiple?.map(
        ({ manuallyCreateParentNodes }) => manuallyCreateParentNodes,
      ),
      ...multiple?.map(({ snippetUuid }) => snippetUuid),
      ...multiple?.map(({ assetUuid }) => assetUuid),
    ],
  );

  // NOTE:
  // this effect only runs for dangerouslySet body media content
  useEffect(() => {
    if (multiple?.length) {
      for (const x of multiple) {
        if (
          x.manuallyCreateParentNodes &&
          typeof window !== "undefined" &&
          x.snippetUuid
        ) {
          if (x.assetType === "video") {
            createVideoDOM(x);
          }

          if (x.assetType === "audio") {
            createAudioDOM(x);
          }
        }
      }
    }
  }, [
    ...multiple?.map(
      ({ manuallyCreateParentNodes }) => manuallyCreateParentNodes,
    ),
    ...multiple?.map(({ snippetUuid }) => snippetUuid),
    ...multiple?.map(({ assetUuid }) => assetUuid),
  ]);

  const produceAssetFields: (assetType: string) => {
    bucket: string;
    assetPath: string;
    type: string;
  } = useCallback(
    (assetType) => {
      if (assetType === "video") {
        return {
          bucket: env.NEXT_PUBLIC_VCMS_BUCKET,
          assetPath: "video.mp4",
          type: "video/mp4",
        };
      }
      return {
        bucket: env.NEXT_PUBLIC_ACMS_BUCKET,
        assetPath: "asset.mp4",
        type: "audio/mp4",
      };
    },
    [
      single?.assetType,
      single?.assetUuid,
      single?.thumbnailUuid,
      single?.snippetUuid,
      ...multiple?.map(({ assetType }) => assetType),
      ...multiple?.map(({ assetUuid }) => assetUuid),
      ...multiple?.map(({ thumbnailUuid }) => thumbnailUuid),
      ...multiple?.map(({ snippetUuid }) => snippetUuid),
    ],
  );

  useEffect(() => {
    if (typeof single !== "undefined") {
      if (single.assetUuid) {
        videojs.registerPlugin("offset", offset);
        const assets = produceAssetFields(single?.assetType);
        const node = !single.manuallyCreateParentNodes
          ? videoNode.current
          : single.snippetUuid;
        playerRef.current = videojs(node, {
          controls: true,
          // TODO: fix poster URL, lets not read from the bucket
          poster: !single.overlayImageUrl
            ? `${assets.bucket}/${single.snippetUuid}/${single.thumbnailUuid}_poster.jpeg`
            : single.overlayImageUrl,

          sources: [
            {
              src: `${assets.bucket}/${single.assetUuid}/${assets.assetPath}`,
              type: assets.type,
            },
          ],
        });
        if (single.endTime !== null && single.startTime !== null) {
          // @ts-ignore - offset plugin doesnt have types
          playerRef?.current.offset({
            start: single.startTime / 1000,
            end: single.endTime / 1000,
            restart_beginning: true, // eslint-disable-line
          });
        }
      }
    }

    return () => {
      if (playerRef?.current) {
        playerRef?.current.dispose();
      }
      return;
    };
  }, [playerRef, produceAssetFields]);

  return { videoNode };
}
