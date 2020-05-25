import Information from "@/domains/Information";

export default interface IInformationAdapter {
  fetch(): Promise<Array<Information>>
}
