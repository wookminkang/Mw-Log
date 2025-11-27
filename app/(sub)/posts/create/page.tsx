import { Card } from "@/components/ui/card";

function PostCreatePage() {
  return (
    <section>
      {/* 내용입력 */}
      <article>
        <Card>
          <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
            Post 작성
          </h1>
          <p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
            아래 내용을 작성해주세요.
          </p>
        </Card>
      </article>
    </section>
  );
}
export default PostCreatePage;
