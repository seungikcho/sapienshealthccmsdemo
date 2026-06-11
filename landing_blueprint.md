# Sapiens Health Landing Blueprint

## Chosen design philosophy

이번 리디자인은 기존 `ideas.md`의 방향 중 **브루탈리스트 스타트업 미학을 정제한 딥테크 엔터프라이즈 스타일**을 바탕으로 하되, 사용자가 준 카드형 예시의 질서감과 Pelica의 절제된 여백을 결합하는 방식으로 진행한다. 핵심은 화려한 세계관이 아니라 **문제가 무엇이고, Sapiens Health가 어떤 실행 레이어를 제공하며, Connect → Prioritize → Execute가 어떻게 작동하는지**를 가장 빠르게 이해시키는 것이다.

## Product thesis

랜딩 페이지의 첫 문장은 의료가 가치기반 진료로 이동하고 있다는 배경보다, 그 전환에서 실제 병목이 어디에 있는지를 먼저 드러내야 한다. 이 사이트는 데이터 분석 자체보다 **care execution**이 빠져 있다는 문제를 강조하고, Sapiens Health가 단절된 환자 데이터를 완료된 임상 워크플로우로 바꾸는 **AI-native execution layer**라는 점을 중심축으로 삼는다.

## Information architecture

| Section         | Purpose                               | Content direction                                                           |
| --------------- | ------------------------------------- | --------------------------------------------------------------------------- |
| Hero            | 제품의 한 줄 정의와 행동 유도         | AI-native execution layer, fragmented data to completed workflows, demo CTA |
| Problem         | 왜 지금 이 제품이 필요한지 설명       | value-based care, execution bottleneck, missed reimbursement, admin burden  |
| Three-step flow | 제품 동작 원리를 가장 직관적으로 전달 | Connect, Prioritize, Execute 카드 3개와 짧은 설명                           |
| Output / proof  | 실제 팀이 무엇을 얻게 되는지 보여줌   | unified care context, ranked task queue, admin review before send           |
| Outcomes        | 임상·운영·재무 측면의 변화 요약       | saved time, task completion, revenue capture, quality windows               |
| Final CTA       | 전환 유도                             | demo 또는 inquiry 연결                                                      |

## Visual system

배경은 거의 검정에 가까운 딥 네이비로 유지하고, 주요 카드에는 살짝 보랏빛이 도는 스모키 바이올렛 톤을 적용한다. 카드의 모서리는 크게 둥글게 처리하되 전부 같은 모서리 언어를 쓰고, 내부 아이콘은 얇은 선 기반으로 통일한다. 사용자가 첨부한 예시처럼 `01`, `02`, `03` 단계 번호가 명확히 보이게 하고, 각 카드 사이에는 아주 절제된 방향성 표식을 넣어 흐름을 암시한다.

## Copy rules

카피는 사용자 제공 텍스트를 기반으로만 정리한다. 기존 MedMIX 표현, 멀티모달 엔진 서사, 병실 일러스트 중심 표현은 모두 제거한다. 문장은 짧고 단호해야 하며, 특히 Hero와 3단계 카드에서는 기능 설명보다 **무엇이 달라지는지**가 먼저 읽히도록 한다.

## Implementation notes

홈페이지는 기존 Home.tsx를 중심으로 전면 재작성한다. 기존 지원 로고 스트립은 유지 여부를 재검토하되, 제품 설명을 방해하지 않도록 더 뒤로 보내거나 축약한다. 시각 요소는 코드 기반 레이아웃과 아이콘 중심으로 해결하고, 필요 시 가벼운 추상 그래픽만 추가한다.
