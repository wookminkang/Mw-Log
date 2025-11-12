"use client"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { DialogFooter } from "@/components/ui/dialog"
import DaumPostcode from "react-daum-postcode"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { nanoid } from "nanoid"

type address_type = {
  id: string
  userName: string
  phone: string
  address1: string
  address2: string
  zipcode: string
  isDefault: boolean
}

function AppAddrDialog({
  children,
  onSave,
}: {
  children: React.ReactNode
  onSave: (data: address_type) => void
}) {
  const [open, setOpen] = useState<boolean>(false)
  const [isPostcodeOpen, setIsPostcodeOpen] = useState<boolean>(false)

  const [userName, setUserName] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [address1, setAddress1] = useState<string>("")
  const [address2, setAddress2] = useState<string>("")
  const [zipcode, setZipcode] = useState<string>("")
  const [isDefault, setIsDefault] = useState<boolean>(false)
  const [isSaveEnabled, setIsSaveEnabled] = useState<boolean>(true)

  const handleIsDefault = (value: boolean | "indeterminate") => {
    setIsDefault(!!value)
  }

  const handleComplete = (data: { roadAddress: string; zonecode: string }) => {
    setAddress1(data.roadAddress)
    setZipcode(data.zonecode)
    setIsPostcodeOpen(false)
  }

  const handleSave = () => {
    const userAddrData = {
      id: nanoid(),
      userName,
      phone,
      address1,
      address2,
      zipcode,
      isDefault,
    }
    toast.success("배송지 저장 완료")
    onSave(userAddrData)
    setOpen(false)
  }

  useEffect(() => {
    const arr = [userName, phone, address1, address2, zipcode]
    const chk = arr.some((item) => item.trim() === "" || !item)
    setIsSaveEnabled(chk)
  }, [userName, phone, address1, address2, zipcode])

  useEffect(() => {
    if (!open) {
      setIsPostcodeOpen(false)
      setUserName("")
      setPhone("")
      setAddress1("")
      setAddress2("")
      setZipcode("")
      setIsDefault(false)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
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
            <Input
              id="d-name"
              placeholder="수령인 이름"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="d-phone">연락처</Label>
            <Input
              id="d-phone"
              placeholder="010-0000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="col-span-1 sm:col-span-2 space-y-2">
            <Label htmlFor="d-address1">주소</Label>
            <Input
              id="d-address1"
              placeholder="도로명 주소"
              readOnly
              value={address1}
              onClick={() => setIsPostcodeOpen(true)}
            />
            {isPostcodeOpen && (
              <DaumPostcode autoClose onComplete={handleComplete} />
            )}
          </div>
          <div className="col-span-1 sm:col-span-2 space-y-2">
            <Label htmlFor="d-address2">상세 주소</Label>
            <Input
              id="d-address2"
              placeholder="동/호수 등"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
            />
          </div>
          <div className="col-span-1 sm:col-span-2 flex items-center gap-2 pt-2">
            <Checkbox
              id="d-save"
              checked={isDefault}
              onCheckedChange={handleIsDefault}
            />
            <Label htmlFor="d-save">주소를 다음에도 사용</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button onClick={handleSave} disabled={isSaveEnabled}>
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AppAddrDialog
