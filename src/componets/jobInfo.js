import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import axios from "axios";

export function JobInfo() {
  let { jobID } = useParams();

  let [jobData, setJobData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        "https://api.json-generator.com/templates/ZM1r0eic3XEy/data?access_token=wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu"
      );
      let job = result.data.filter((j) => {
        return j.id === jobID;
      });
      setJobData(job[0]);
    }
    fetchData().then((r) => r);
  }, [jobID]);

  const token = "AIzaSyA5WHivv29XRW8m8-2t-hjVlqBlb-e8m30";
  let money = jobData.salary?.replace(/k/g, " 000");
  const date1 = new Date();
  const date2 = new Date(jobData.createdAt);
  const diffTime = Math.abs(date2 - date1);
  let totalDifDay = parseInt(diffTime / (3600 * 24) / 1000);

  let textArray,
    aboutText,
    secondTextArray,
    responsibilityText,
    benefitsText,
    lat,
    long;

  if (Object.keys(jobData).length) {
    lat = jobData.location.lat;
    long = jobData.location.long;
    textArray = jobData.description.split("Responsopilities:");
    aboutText = textArray[0]?.split("\n")?.map((str) => <p>{str}</p>);
    secondTextArray = textArray[1]?.split("Compensation & Benefits:");
    responsibilityText = secondTextArray[0]
      ?.split("\n")
      ?.map((str) => <p>{str}</p>);
    benefitsText = secondTextArray[1]?.split("\n")?.map((str) => <p>{str}</p>);
  }

  const containerStyle = {
    width: "400px",
    height: "218px",
  };

  const center = {
    lat: lat,
    lng: long,
  };

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  if (jobData.length === 0) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="bg-[#FFFFFF]">
      <div className="flex flex-col text-start">
        <div>
          <div className="flex flex-col-reverse mt-6 lg:mt-[56px] divide-y ml-[3%] mr-[4%] w-[93%] lg:ml-[18%] lg:mr-[44%] lg:w-[38%] divide-y-reverse divide-inherit">
            <div>
              <div className="md:hidden pt-6 flex flex-row gap-3 ml-[1%] text=[#38415DD1]">
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.9975 6.5607L13.2235 7.13915L13.8422 7.193L13.9289 6.19677L13.8422 7.193L13.8423 7.19301L13.8426 7.19303L13.8437 7.19313L13.8484 7.19354L13.8672 7.19519L13.9408 7.20167L14.218 7.22636C14.4554 7.24767 14.7908 7.27817 15.1826 7.31487C15.9672 7.38837 16.9742 7.48641 17.8719 7.58525L17.8721 7.58527C17.9166 7.59017 17.962 7.59511 18.0081 7.60013C18.4823 7.6518 19.0293 7.71139 19.4869 7.80862C19.4942 7.81017 19.5014 7.81172 19.5085 7.81327C18.9875 8.47404 18.1217 9.45889 17.3475 10.3191C16.9389 10.773 16.5632 11.1843 16.2895 11.4821C16.1527 11.631 16.0415 11.7513 15.9647 11.8343L15.8763 11.9297L15.8534 11.9543L15.8477 11.9605L15.8463 11.962L15.846 11.9623L15.8459 11.9624L16.5779 12.6437L15.8459 11.9624L15.5351 12.2963L15.5836 12.7499L15.5836 12.7499L15.5836 12.7501L15.5837 12.7508L15.584 12.7537L15.5853 12.7655L15.5902 12.8124L15.609 12.9925C15.6252 13.1484 15.6482 13.3726 15.6754 13.6451C15.7298 14.1901 15.8009 14.927 15.8678 15.6961L12.9975 6.5607ZM12.9975 6.5607L12.9975 6.56063L12.9973 6.56007L12.9962 6.55728L12.9914 6.54518L12.9719 6.49582C12.9546 6.45213 12.9288 6.38737 12.8954 6.30457C12.8285 6.13892 12.7315 5.90137 12.6115 5.61597C12.371 5.04388 12.0409 4.28549 11.6787 3.53084C11.3131 2.76881 10.9298 2.04221 10.5848 1.51806C10.5213 1.42159 10.4623 1.33699 10.4081 1.26367C10.2149 1.52377 9.99065 1.88238 9.74909 2.31272C9.19783 3.2948 8.63337 4.51029 8.23735 5.40591C8.08227 5.75663 7.95485 6.05412 7.86641 6.26344C7.82221 6.36805 7.78779 6.45051 7.76458 6.50645L7.73836 6.56988L7.73189 6.58562L7.73037 6.58931L7.73005 6.5901L7.73003 6.59016L7.73002 6.59019L7.73001 6.59021L7.73001 6.59022L7.49935 7.15491L6.89165 7.2082L12.9975 6.5607ZM4.27041 12.6688L5.03061 12.0191L5.03055 12.019L5.03037 12.0188L5.02975 12.0181L5.02751 12.0155L5.01914 12.0057L4.98726 11.9685C4.95946 11.9362 4.91882 11.8891 4.86683 11.829C4.76287 11.709 4.61342 11.5373 4.43047 11.3296C4.06495 10.9147 3.56383 10.354 3.02344 9.77321M4.27041 12.6688L6.89164 7.2082L6.89162 7.2082L6.89144 7.20822L6.89056 7.2083L6.8868 7.20863L6.8714 7.20999L6.81028 7.21547C6.75652 7.22031 6.67732 7.22752 6.57634 7.23689C6.37434 7.25565 6.08532 7.28309 5.73828 7.3177C5.04348 7.387 4.11945 7.48475 3.19705 7.59894L3.19672 7.59898C2.37006 7.70104 1.74602 7.79401 1.30164 7.8948M4.27041 12.6688L5.26653 12.7567L5.30347 12.3384L5.03065 12.0191L4.27041 12.6688ZM4.27041 12.6688L5.26653 12.7567M4.27041 12.6688L5.26653 12.7567M3.02344 9.77321C3.02351 9.77328 3.02357 9.77335 3.02364 9.77342L2.29133 10.4544L3.02344 9.77321ZM3.02344 9.77321C2.8328 9.5682 2.64438 9.36972 2.46221 9.17782C2.06038 8.75454 1.68895 8.36329 1.39108 8.00455C1.35927 7.96624 1.32948 7.92967 1.30164 7.8948M1.30164 7.8948C1.27379 7.90111 1.24665 7.90746 1.2202 7.91384C0.995525 7.96806 0.861734 8.01556 0.791033 8.04877C0.779047 8.0544 0.770505 8.05885 0.764925 8.06195M1.30164 7.8948C1.14047 7.69296 1.04444 7.54836 0.998446 7.45637C0.993019 7.44552 0.988644 7.43627 0.98517 7.42855M0.764925 8.06195C0.785291 8.0479 0.839775 8.00413 0.892693 7.91875C0.892801 7.91858 0.892909 7.9184 0.893018 7.91823C1.0319 7.69362 1.00515 7.50102 0.98517 7.42855M0.764925 8.06195C0.758983 8.06526 0.756401 8.06704 0.756595 8.0671C0.756789 8.06717 0.75976 8.06552 0.764925 8.06195ZM0.98517 7.42855C0.979838 7.4092 0.974988 7.39842 0.973895 7.39786C0.972803 7.3973 0.975469 7.40697 0.98517 7.42855ZM16.67 19.5788C16.8422 19.5156 17.0077 19.4066 17.0998 19.0067C17.1647 18.7278 17.0418 17.4634 16.9421 16.438C16.9121 16.1292 16.8842 15.842 16.8641 15.61L15.8678 15.6962C15.8884 15.9338 15.9168 16.2261 15.9466 16.5328L15.954 16.6094C15.9868 16.9468 16.021 17.3011 16.0498 17.6344C16.077 17.9482 16.0985 18.2335 16.1096 18.4622M16.67 19.5788L16.4037 18.8464L16.4031 18.8446L16.3283 18.639C16.4218 18.605 16.492 18.6038 16.5185 18.6053M16.67 19.5788L16.4009 18.8457L16.4002 18.8439L16.3254 18.6401C16.3307 18.6381 16.3071 18.6462 16.2725 18.6675C16.2347 18.6908 16.1957 18.7224 16.1621 18.7609C16.1549 18.7691 16.1486 18.7769 16.1431 18.7841C16.1426 18.7848 16.1421 18.7854 16.1416 18.786C16.1305 18.8009 16.1227 18.8134 16.1175 18.8225C16.116 18.8321 16.1155 18.8374 16.1154 18.8374C16.1154 18.8374 16.1158 18.8334 16.1162 18.8248C16.1114 18.8335 16.1094 18.8385 16.1094 18.8385C16.1094 18.8386 16.1122 18.8318 16.1166 18.8163M16.67 19.5788L16.1166 18.8163M16.5185 18.6053C16.5265 18.6066 16.5302 18.6069 16.53 18.6066C16.5299 18.6064 16.5259 18.6058 16.5185 18.6053ZM16.5185 18.6053C16.5093 18.6038 16.4947 18.6009 16.4738 18.5956C16.3933 18.5752 16.2752 18.5335 16.1096 18.4622M16.1096 18.4622C16.1104 18.4778 16.1111 18.493 16.1118 18.5081C16.117 18.6265 16.1187 18.7172 16.1176 18.7812C16.1174 18.7959 16.117 18.8075 16.1166 18.8163M16.1096 18.4622C16.0789 18.449 16.0465 18.4347 16.0125 18.4194C15.7544 18.3033 15.5035 18.1767 15.218 18.0326C14.9753 17.9101 14.7075 17.775 14.3889 17.6229M16.1166 18.8163L14.3889 17.6229M14.3889 17.6229L13.9577 18.5245L14.3882 17.6226C13.5522 17.2228 12.6663 16.81 11.9904 16.4977C11.6521 16.3414 11.3658 16.2099 11.1641 16.1176L10.9288 16.01L10.8661 15.9814L10.8499 15.974L10.8458 15.9721L10.8447 15.9716L10.8444 15.9715L10.8443 15.9715L10.4302 16.8817L10.8443 15.9715L10.4004 15.7695L9.96804 15.9949L9.96802 15.9949L9.96801 15.9949L9.96795 15.995L9.96765 15.9951L9.96558 15.9962L9.95621 16.0011L9.91722 16.0212C9.88247 16.039 9.83055 16.0656 9.76343 16.0996C9.62914 16.1675 9.43421 16.265 9.19423 16.3819C8.71347 16.6161 8.05594 16.926 7.34517 17.2312L14.3889 17.6229ZM4.9898 15.804L4.98975 15.8046C4.95694 16.1549 4.9205 16.4926 4.88565 16.8157C4.83072 17.3248 4.77971 17.7976 4.75301 18.226C4.74728 18.3179 4.74311 18.4025 4.7404 18.4799C4.841 18.4399 4.95501 18.3905 5.08365 18.331C5.34342 18.2108 5.62075 18.0697 5.92894 17.913C5.9942 17.8798 6.06083 17.8459 6.12898 17.8113C6.50821 17.6191 6.92363 17.4121 7.345 17.2313L4.9898 15.804ZM4.9898 15.804C5.06393 15.0077 5.13311 14.246 5.18374 13.6835M4.9898 15.804L5.18374 13.6835M5.18374 13.6835C5.20906 13.4022 5.22974 13.1706 5.24411 13.0093M5.18374 13.6835L5.24411 13.0093M5.24411 13.0093L5.2607 12.8226M5.24411 13.0093L5.2607 12.8226M5.2607 12.8226L5.26504 12.7736M5.2607 12.8226L5.26504 12.7736M5.26504 12.7736L5.26615 12.761M5.26504 12.7736L5.26615 12.761M5.26615 12.761L5.26643 12.7578M5.26615 12.761L5.26643 12.7578M5.26643 12.7578L5.26651 12.757M5.26643 12.7578L5.26651 12.757M5.26651 12.757L5.26652 12.7568M5.26651 12.757L5.26652 12.7568M5.26652 12.7568L5.26653 12.7567M5.26652 12.7568L5.26653 12.7567M10.7139 0.919588C10.7139 0.919891 10.7102 0.922693 10.7032 0.927088C10.7104 0.921482 10.714 0.919285 10.7139 0.919588ZM10.1198 0.933166C10.1077 0.92589 10.1015 0.920821 10.1014 0.920105C10.1013 0.91939 10.1074 0.923027 10.1198 0.933166ZM20.0351 7.98136C20.0341 7.98159 20.025 7.97683 20.0106 7.96641C20.0289 7.97592 20.0361 7.98114 20.0351 7.98136ZM4.27579 18.6149C4.27589 18.6148 4.27861 18.6146 4.28364 18.6149C4.2782 18.6152 4.27569 18.6151 4.27579 18.6149Z"
                    stroke="#3A4562"
                    stroke-width="2"
                  />
                </svg>
                <span className="mr-[24px] text-[#38415DD1]">
                  Save to my list
                </span>
                <svg
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.8"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.04 14.9096L5.91 10.743C5.96 10.512 6 10.2811 6 10.0402C6 9.7992 5.96 9.56827 5.91 9.33735L12.96 5.21084C13.5 5.71285 14.21 6.0241 15 6.0241C16.66 6.0241 18 4.67871 18 3.01205C18 1.34538 16.66 0 15 0C13.34 0 12 1.34538 12 3.01205C12 3.25301 12.04 3.48394 12.09 3.71486L5.04 7.84137C4.5 7.33936 3.79 7.02811 3 7.02811C1.34 7.02811 0 8.37349 0 10.0402C0 11.7068 1.34 13.0522 3 13.0522C3.79 13.0522 4.5 12.741 5.04 12.239L12.16 16.4157C12.11 16.6265 12.08 16.8474 12.08 17.0683C12.08 18.6847 13.39 20 15 20C16.61 20 17.92 18.6847 17.92 17.0683C17.92 15.4518 16.61 14.1365 15 14.1365C14.24 14.1365 13.56 14.4378 13.04 14.9096Z"
                    fill="#38415D"
                  />
                </svg>
                <span className="text-[#38415DD1]">Share</span>
              </div>
              <div className="text-center mt-10 md:text-left">
                <button className="hidden mb-8 lg:block rounded-lg bg-[#384564] text-[#FFFFFF] font-semibold text-xs leading-4 px-8 py-5">
                  APPLY NOW
                </button>
              </div>
            </div>
            {/* pt-8 lg:pt-10 */}
            <div className="flex justify-between">
              <div className="pb-2 text-3xl font-bold not-italic leading-9 text-[#3A4562]">
                Job details
              </div>
              <div className="hidden lg:block pt-[10px]">
                <div className="flex flex-row">
                  <svg
                    className=""
                    width="19"
                    height="23"
                    viewBox="0 0 19 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M1.5 4.00016C1.5 2.5274 2.69391 1.3335 4.16667 1.3335H14.8333C16.3061 1.3335 17.5 2.5274 17.5 4.00016V19.9936C17.5 21.1595 16.109 21.7639 15.2567 20.9682L10.4099 16.4428C9.89761 15.9645 9.10239 15.9645 8.59007 16.4428L3.74327 20.9682C2.89104 21.7639 1.5 21.1595 1.5 19.9936V4.00016Z"
                      stroke="#70778B"
                      stroke-width="2"
                    />
                  </svg>
                  <div className="text-[#3A4562] not-italic font-normal text-[18px] leading-6 tracking-[-0.5625px] pl-[16px] mr-[31px]">
                    Save to my list
                  </div>
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.8"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.04 14.9096L5.91 10.743C5.96 10.512 6 10.2811 6 10.0402C6 9.7992 5.96 9.56827 5.91 9.33735L12.96 5.21084C13.5 5.71285 14.21 6.0241 15 6.0241C16.66 6.0241 18 4.67871 18 3.01205C18 1.34538 16.66 0 15 0C13.34 0 12 1.34538 12 3.01205C12 3.25301 12.04 3.48394 12.09 3.71486L5.04 7.84137C4.5 7.33936 3.79 7.02811 3 7.02811C1.34 7.02811 0 8.37349 0 10.0402C0 11.7068 1.34 13.0522 3 13.0522C3.79 13.0522 4.5 12.741 5.04 12.239L12.16 16.4157C12.11 16.6265 12.08 16.8474 12.08 17.0683C12.08 18.6847 13.39 20 15 20C16.61 20 17.92 18.6847 17.92 17.0683C17.92 15.4518 16.61 14.1365 15 14.1365C14.24 14.1365 13.56 14.4378 13.04 14.9096Z"
                      fill="#38415D"
                    />
                  </svg>
                  <div className="text-[#3A4562] not-italic font-normal text-[18px] leading-6 tracking-[-0.5625px] pl-[16px]">
                    Share
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between ml-[3%] mr-[4%] lg:ml-[18%] lg:mr-[0%] lg:w-[38%] lg:mt-0">
            <div className="lg:w-[38%] text-[#3A4562] font-bold text-[24px] tracking-[0.75px] not-italic leading-[30px] w-[93%] lg:w-[60%]">
              <span>{jobData.title}</span>
            </div>
            <div className="hidden lg:block">
              <div className="font-bold text-xl leading-6 text-[#3A4562]">
                € {money}
              </div>
              <div className="font-normal text-[18px] not-italic tracking-[-0.5625px] leading-6 text-[#38415D]">
                Brutto, per year
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between pb-[14px]">
          <div className="text-sm font-light leading-6 text-[#878D9D] ml-[3%] lg:ml-[18%] mt-[21px] lg:mt-[7px]">
            <span>Posted {totalDifDay} days ago</span>
          </div>
          <div className="block lg:hidden text-right mr-[14px]">
            <div className="font-normal text-lg leading-6 text-[#38415D]">
              Brutto, per year
            </div>
            <div className="font-bold text-xl leading-6 text-[#3A4562]">
              € {money}
            </div>
          </div>
        </div>

        <div className="ml-[3%] mr-[4%] w-[93%] lg:ml-[18%] lg:mr-[44%] lg:w-[38%] lg:mt-[7px] text-left">
          <span className="lg:font-[Roboto] font-normal text-lg leading-6 text-[#38415D]">
            {aboutText}
          </span>
          <br />
          <span className="font-bold text-xl leading-6 text-[#3A4562]">
            Responsopilities:
          </span>
          <br />
          <span className="lg:font-[Roboto] font-normal text-lg leading-6 text-[#38415D]">
            {responsibilityText}
          </span>
          <br />
          <span className="font-bold text-xl leading-6 text-[#3A4562]">
            Compensation & Benefits:
          </span>
          <br />
          <span className="lg:font-[Roboto] font-normal text-lg leading-6 text-[#38415D]">
            {benefitsText}
          </span>
        </div>
        <div className="text-center mt-5 lg:mt-6 lg:ml-[18%] md:text-left">
          <button className="rounded-lg bg-[#384564] text-[#FFFFFF] font-semibold text-xs leading-4 px-8 py-5">
            APPLY NOW
          </button>
        </div>
        <div class="flex lg:hidden block flex-col-reverse mt-44 divide-y ml-[3%] mr-[4%] w-[93%] lg:ml-[18%] lg:mr-[44%] lg:w-[38%] divide-y-reverse divide-inherit">
          <div className="flex flex-row gap-x-3">
            {jobData.pictures?.map((item) => (
              <img
                src={item}
                className="rounded-lg w-52 h-28 mt-3.5"
                alt="Logo"
              />
            ))}
          </div>
          <div>
            <div>
              <h2 className="pb-2.5 text-3xl font-bold not-italic leading-9 text-[#3A4562]">
                Attached images
              </h2>
            </div>
          </div>
        </div>
        <div class="flex flex-col-reverse mt-[135px] lg:mt-[86px] divide-y ml-[3%] mr-[4%] w-[93%] lg:ml-[18%] lg:mr-[44%] lg:w-[38%] divide-y-reverse divide-inherit">
          <div className="">
            <div className="mt-5">
              <div className="not-italic font-normal text-lg leading-6 text-[#38415D]">
                Employment type
              </div>
            </div>
            <div className="flex flex-row gap-x-2">
              {jobData.employment_type?.map((item) => (
                <div className="text-center mt-3.5 w-32 md:w-52">
                  <div className="border border-solid tracking-[-0.457143px] rounded-lg bg-[#A1B1DB]/[0.317343] text-[#55699E] not-italic font-bold text-xs leading-4 px-8 py-5">
                    {item}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-7">
              <div className="not-italic font-normal text-lg leading-6 text-[#38415D]">
                Benefits
              </div>
            </div>
            <div className="flex flex-row gap-x-1.5">
              {jobData.benefits?.map((item) => (
                <div className="text-center mt-3.5 w-40 md:w-56">
                  <div className="border border-solid rounded-lg bg-[#ffd000]/[0.15] tracking-[-0.4px] text-[#988B49] not-italic font-bold text-xs leading-4 px-8 py-5">
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div>
              <div className="pb-2.5 text-3xl font-bold not-italic leading-9 text-[#3A4562]">
                Additional info
              </div>
            </div>
          </div>
        </div>
        <div class="hidden lg:flex block flex-col-reverse mt-[87px] divide-y ml-[3%] mr-[4%] w-[93%] lg:ml-[18%] lg:mr-[44%] lg:w-[38%] divide-y-reverse divide-inherit">
          <div className="flex flex-row gap-x-3">
            {jobData.pictures?.map((item) => (
              <img
                src={item}
                className="rounded-lg w-52 h-28 mt-3.5"
                alt="Logo"
              />
            ))}
          </div>
          <div>
            <div>
              <h2 className="pb-2.5 text-3xl font-bold not-italic leading-9 text-[#3A4562]">
                Attached images
              </h2>
            </div>
          </div>
        </div>
        <div class="block mb-10 lg:hidden mt-20 flex flex-col-reverse divide-y ml-[3%] mr-[4%] w-[93%] lg:w-3/6 divide-y-reverse divide-inherit">
          <div className="lg:text-center mt-3.5 w-40 md:w-56">
            <div className="block lg:hidden">
              <div className="w-[400px] h-[218px] bg-[#2A3047] flex flex-col text-center text-[20px]">
                <div className="mt-[10%]">
                  <div className="font-bold  leading-5 tracking-[-0.63 px] text-[#E7EAF0]">
                    {jobData.name}.
                    <br />
                    University Hospital Giessen.
                  </div>
                  <div className="font-[Roboto] font-normal leading-6 tracking-[-0.56 px] text-[#E8EBF3]">
                    {jobData.address}
                    <br />
                    {jobData.phone},
                    <br />
                    {jobData.email}
                  </div>
                </div>
              </div>
              <div className="">
                <LoadScript googleMapsApiKey={token}>
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    options={{ disableDefaultUI: true }}
                  >
                    <Marker position={center} />
                  </GoogleMap>
                </LoadScript>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="pb-2.5 text-3xl font-bold not-italic leading-9 text-[#3A4562]">
                Contact
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-[89px] md:text-left ml-[8%]">
          <button
            onClick={goBack}
            className="mix-blend-normal uppercase hidden mb-8 lg:block rounded-lg bg-[#384564]/[0.14]  not-italic text-black font-semibold text-[12px] leading-4 px-8 py-5"
          >
            <div className="text-[#3A4562] flex flex-row ">
              {
                <svg
                  className="w-[10px] h-[18px] mr-[18px]"
                  viewBox="0 0 10 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.66053 0.401157C10.1272 0.915451 10.108 1.72975 9.61804 2.21833L3.37247 8.69844C3.21164 8.8613 3.21164 9.13559 3.37247 9.29845L9.62137 15.7786C10.1105 16.2671 10.128 17.0814 9.66053 17.5957C9.19305 18.1186 8.41725 18.1357 7.92894 17.6386L0.390931 9.96703C-0.114047 9.45274 -0.13238 8.61272 0.350933 8.08129L7.92894 0.358299V0.358299C8.41809 -0.138852 9.19389 -0.113138 9.66053 0.401157Z"
                    fill="#384564"
                  />
                </svg>
              }
              RETURN TO JOB BOARD
            </div>
          </button>
        </div>
        <div className="hidden lg:block absolute right-0 mr-[6%] mt-[50px]">
          <div className="w-[400px] h-[218px] bg-[#2A3047] flex flex-col text-center text-[20px]">
            <div className="mt-[10%]">
              <div className="font-bold  leading-5 tracking-[-0.63 px] text-[#E7EAF0]">
                {jobData.name}.
                <br />
                University Hospital Giessen.
              </div>
              <div className="font-[Roboto] font-normal leading-6 tracking-[-0.56 px] text-[#E8EBF3]">
                {jobData.address}
                <br />
                {jobData.phone},
                <br />
                {jobData.email}
              </div>
            </div>
          </div>
          <div className="">
            <LoadScript googleMapsApiKey={token}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                options={{ disableDefaultUI: true }}
              >
                <Marker position={center} />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </div>
  );
}
