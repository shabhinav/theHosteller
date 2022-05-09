import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { mapSrc } from "../../../Resources/constants/common";
import HomeCard from "../../Home/Card/Card";
import Card from "../Card/Card";
import MultiCarousel from "../Multi-Carousel/Multi-Carousel";
import "./TabPanel.scss";
import { htmlParserChecker } from "../../../Utils/utils";

const CustomTabPanel = ({
  locationUrl,
  tabPanel,
  children,
  name,
  setLoader,
}) => {
  const pathName = window.location.pathname;

  return (
    <div>
      <Tabs>
        <TabList>
          {tabPanel.map((tab) => (
            <Tab>{tab.name}</Tab>
          ))}
        </TabList>
        <div>
          {tabPanel.map((tab) => (
            <TabPanel>
              {pathName === "/" ||
              pathName === "/workation" ||
              pathName === "/hostel" ||
              pathName === "/trip" ? (
                <MultiCarousel>
                  {tab[tab.name].map((item, index) => (
                    <Card>
                      <HomeCard
                        setLoader={setLoader}
                        index={index}
                        item={item}
                        name={name}
                      />
                    </Card>
                  ))}
                </MultiCarousel>
              ) : (
                <div className='location_description'>
                  {tab.name === "Location Map" ? (
                    <iframe
                      src={locationUrl}
                      width='100%'
                      height='450px'
                      title='map'
                      loading='lazy'
                    ></iframe>
                  ) : (
                    <div>
                      {Array.isArray(tab?.description) ? (
                        <ul>
                          {tab?.description.map((item) => (
                            <li className='text-sm leading-7  text-blogPara'>
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className='text-sm leading-7 text-blogPara'>
                          {htmlParserChecker(tab?.description)}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </TabPanel>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default CustomTabPanel;
