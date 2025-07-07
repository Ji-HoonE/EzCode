/*ui*/
/**@description tabs 컴포넌트 (문제, 토론 토글) */
export { default as DetailProblem } from './ui/Tabs/DetailProblem';
export { default as Discussion } from './ui/Tabs/Discussion';

/**@description 코드 에디터, 터미널, 터미널패널이 있는 ProblemWorksSection 컴포넌트 */
export { default as ProblemWorksSection } from './ui/ProblemWorksSection';

//actions
export { getDetailProblem } from './actions/problem.actions';
export { getDiscussions } from './actions/discussion.actions';
