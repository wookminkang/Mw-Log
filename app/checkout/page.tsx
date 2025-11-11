"use client"
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  Label,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui"

function CheckoutPage() {
  const hasAddress = false
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold">결제</h1>
      <Separator className="my-6" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {hasAddress ? (
            <Card>
              <CardHeader>
                <CardTitle>배송 정보</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">이름</Label>
                  <Input id="name" placeholder="수령인 이름" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">연락처</Label>
                  <Input id="phone" placeholder="010-0000-0000" />
                </div>
                <div className="col-span-1 sm:col-span-2 space-y-2">
                  <Label htmlFor="address1">주소</Label>
                  <Input id="address1" placeholder="도로명 주소" />
                </div>
                <div className="col-span-1 sm:col-span-2 space-y-2">
                  <Label htmlFor="address2">상세 주소</Label>
                  <Input id="address2" placeholder="동/호수 등" />
                </div>
                <div className="col-span-1 sm:col-span-2 flex items-center gap-2 pt-2">
                  <Checkbox id="save-address" />
                  <Label htmlFor="save-address">주소를 다음에도 사용</Label>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>배송 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  등록된 배송지가 없습니다. 배송지를 추가해 주세요.
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">배송지 추가하기</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>배송지 추가</DialogTitle>
                      <DialogDescription>
                        주문을 위한 새로운 배송지를 입력하세요.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="d-name">이름</Label>
                        <Input id="d-name" placeholder="수령인 이름" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="d-phone">연락처</Label>
                        <Input id="d-phone" placeholder="010-0000-0000" />
                      </div>
                      <div className="col-span-1 sm:col-span-2 space-y-2">
                        <Label htmlFor="d-address1">주소</Label>
                        <Input id="d-address1" placeholder="도로명 주소" />
                      </div>
                      <div className="col-span-1 sm:col-span-2 space-y-2">
                        <Label htmlFor="d-address2">상세 주소</Label>
                        <Input id="d-address2" placeholder="동/호수 등" />
                      </div>
                      <div className="col-span-1 sm:col-span-2 flex items-center gap-2 pt-2">
                        <Checkbox id="d-save" />
                        <Label htmlFor="d-save">주소를 다음에도 사용</Label>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="ghost">취소</Button>
                      <Button>저장</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>결제 수단</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  신용/체크카드
                </Button>
                <Button variant="outline" size="sm">
                  계좌이체
                </Button>
                <Button variant="outline" size="sm">
                  간편결제
                </Button>
                <Button variant="outline" size="sm">
                  무통장입금
                </Button>
              </div>
              <Separator />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="payer-name">결제자명</Label>
                  <Input id="payer-name" placeholder="홍길동" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payer-email">이메일</Label>
                  <Input id="payer-email" placeholder="you@example.com" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>주문 상품</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>상품명</TableHead>
                    <TableHead>옵션</TableHead>
                    <TableHead className="text-right">수량</TableHead>
                    <TableHead className="text-right">가격</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>베이직 티셔츠</TableCell>
                    <TableCell>블랙 / M</TableCell>
                    <TableCell className="text-right">1</TableCell>
                    <TableCell className="text-right">₩25,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>슬림 진</TableCell>
                    <TableCell>네이비 / 30</TableCell>
                    <TableCell className="text-right">1</TableCell>
                    <TableCell className="text-right">₩59,000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>주문 요약</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>상품 합계</span>
                <span>₩84,000</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>배송비</span>
                <span>₩3,000</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>할인</span>
                <span>- ₩5,000</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between font-semibold">
                <span>총 결제금액</span>
                <span>₩82,000</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Checkbox id="agree" />
                <Label htmlFor="agree" className="text-sm">
                  주문 상품, 결제 및 약관에 동의합니다.
                </Label>
              </div>
              <Button className="w-full">주문하기</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
