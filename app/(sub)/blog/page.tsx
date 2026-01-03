import { Separator } from "@/components/ui/separator";

export default function BlogPage() {
  return (
    <div className="py-3">
      <h2 className="font-bold text-3xl">짧은 기록,</h2>
      <h3 className="text-base text-gray-600 mt-2">
        긴 글로 쓰기엔 짧지만, 흘려보내기엔 아쉬운 생각과 감정, 배움의 흔적들
      </h3>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 gap-10">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">
            25년도 다 지나갔다. 올 한 해 어땠나 한번 쭉 훑어보자.
          </h2>
          <p className="text-base text-foreground/65 mb-6">2025.12.31</p>
          <h3 className="text-lg text-mutedgrey-700 mb-4">
            지난 1년간의 업무 성과와 기술적 성장을 객관적으로 회고하고자 한다.
          </h3>

          <h4 className="font-semibold">
            1. AI: 최고의 비서이자, 나를 게으르게 만든 주범
          </h4>
          <p className="text-base text-foreground/65 mb-3.5">
            올 한 해를 관통하는 키워드는 단연 AI였다. 솔직히 인정하자면, AI
            덕분에 업무는 너무 편해졌다. 예전 같으면 며칠 끙끙댔을 문제들도
            순식간에 해결되곤 했다. 하지만 편안함 뒤에는 '게으름'이라는게 문제
            였다. 어느 순간부터 코드를 작성할 때 내 생각이 들어가는 비중이
            줄어들었다. "어차피 AI가 짜주니까", "AI가 맞겠지"라는 안일한
            믿음으로 검증 없이 코드를 붙여 넣는 나 자신을 발견했다. 결과적으로
            일 처리는 빨라졌지만, '과연 내 진짜 실력도 그만큼 성장했는가?'라고
            묻는다면 자신 있게 "Yes"라고 답하기 어렵다. AI는 도구일 뿐인데, 내가
            도구에 의존하다 못해 잠식당한 건 아닌지 반성하게 된다.
          </p>

          <h4 className="font-semibold">
            2. 지독한 프로젝트, 그럼에도 남은 것들
          </h4>
          <p className="text-base text-foreground/65 mb-3.5">
            상반기부터 하반기까지 쉴 새 없이 여러 프로젝트를 달렸다. AI 의존도에
            대한 아쉬움은 남지만, 그렇다고 그 시간이 헛된 것은 아니었다. 치열한
            현장 경험 속에서 다양한 이슈를 마주했고, 전반적인 프로젝트 사이클을
            경험한 것 자체가 큰 자산이 되었다. 비록 AI의 힘을 빌렸을지언정,
            수많은 문제를 해결하며 완주해낸 경험들은 분명 내 안에 쌓여있다. 이
            경험들이 2026년의 밑거름이 될 것이라 믿는다.
          </p>

          <h4 className="font-semibold">3. 2026년 목표: 100000억 벌기!</h4>
          <p className="text-base text-foreground/65 mb-3.5">
            다가오는 2026년에는 AI를 단순히 '코딩 로봇'이 아니라, 내 비즈니스를
            실현할 강력한 무기로 사용해보려 한다. 1인 사업자 도전: 2026년에는 내
            이름으로 된 사업자를 내고 홀로서기를 시도할 것이다. 상반기 런칭:
            다양한 AI 툴을 적극적으로 활용해, 생산성을 극대화하여 상반기 안에는
            나만의 서비스를 런칭하는 것이 목표다.
          </p>

          <h4 className="font-semibold">4. 기본기와 건강, 그리고 꾸준함</h4>
          <p className="text-base text-foreground/65 mb-3.5">
            사업 도전과 별개로, 개발자로서의 본질도 놓치지 않으려 한다. AI에게
            뺏겼던 '생각하는 힘'을 되찾는 한 해가 되어야 한다. 스킬 레벨업: AI가
            짜준 코드를 그대로 쓰는 게 아니라, 뜯어보고 이해하고 재구성할 수
            있는 진짜 실력을 기르겠다. 기술 블로그 (주 1회): 머릿속에 있는
            지식을 글로 정리하며 내 것으로 만드는 시간을 갖겠다. 일주일에
            하나씩, 꾸준함의 힘을 믿어본다. 건강 관리: 무엇보다 이 모든 것을
            해내려면 체력이 중요하다 4월부터 런닝 주 3회 도전!!
          </p>
          <br />
          <h3 className="text-lg text-mutedgrey-600 mb-4">
            2026년은 'AI를 지배하며' 진짜 내 것을 만드는 해가 되기를.
          </h3>
        </div>
      </div>
    </div>
  );
}
