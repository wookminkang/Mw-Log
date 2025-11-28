import { Suspense } from "react";
import { PostList, SkeletonPosts } from "./components";

export default function MainHome() {
  return (
    <>
      <section>
        <article>
          <h2 className="text-primary leading-tighter text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter max-w-4xl">
            돌멩이 🪨
          </h2>
          <p>
            "늘 새로운 것을 탐구하고 분석하고, 일상 속 익숙해진 불편함을
            해결하는 데 집중하면서 내 맘대로 작업물을 업로드하고 있습니다."
            <br />이 페이지는 개인 작업과 기술 실험을 모아 둔 포트폴리오이자
            블로그입니다. UI/UX 실험과 성능 최적화 결과, 그리고 프로젝트 메모를
            한 곳에서 빠르게 공유합니다.
          </p>
        </article>
      </section>

      <section>
        <article>
          <h3>떼굴떼굴 🌬️🪨</h3>

          <ul>
            <li className="flex items-center gap-2">
              <div>
                <strong>Healingpaper</strong>
              </div>
              <div>
                <p>Web Frontend Lead | 2020.05 - Now</p>
              </div>
            </li>
          </ul>
        </article>
      </section>

      <section>
        <article>
            <PostList />
        </article>
      </section>
    </>
  );
}
