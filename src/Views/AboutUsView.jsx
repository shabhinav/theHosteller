import React from "react";
import Meta from "../Components/Common/Meta/Meta";
import Carousel from "../Components/Common/Carousel/Carousel";
import bannerImage from "../Assets/images/banner.png";

const aboutUs = [
  {
    heading: "Why The Hosteller? ",
    paragraph:
      "The Hosteller began in 2014 with a simple dream - how to make travel more affordable, comfortable and interactive for Indians. Today, India is the 7th largest tourism sector by GDP alone but it is noticeable that not many young Indian travellers are able to enjoy the freedom and facilities to travel at will. Prices, timings and budget all come in the way. This is what we wish to resolve.\n Our aim is as simple as our slogan. It is to make people ‘Get Up Go’. We want the travel community to be enriched with the idea of exploring new places, seeing different cultures, tasting local cuisines and understanding how much they can benefit from backpacker hostels.",
  },
  {
    heading: "What is The Hosteller?",
    paragraph:
      "We are ‘the’ friendly neighbourhood backpacker hostel amigos! But all puns aside, we are a chain of backpacker hostels that provides comfortable budget accommodation and enriches your stay with a plethora of fun activities. Our spacious and creatively curated hostels are built in such a way that you can experience the best stay all while immersing yourself in the global backpacking culture.\n Each of our 25+ hostels provides modern facilities like clean and safe rooms, secure lockers, a well-stocked common kitchen, air conditioners, paid laundry services, equipped libraries, exclusive female dormitories, travel and transport services, a colourful and well-stocked cafe, well lit common rooms and wide open-spaces where our fellow travellers can bond over cups of lip-smacking coffee. Right from when you enter The Hosteller to the last moment when you leave - we want it all to be taken care of.\n  And that is precisely why we also pride ourselves on having an energetic travel desk who are always going to be more than happy to tell you all about the city and the not-to-miss places. We are also curators of some exciting and adventurous trips that allow you to experience the best of our locations while not breaking the bank.",
  },
  {
    heading: "Who is The Hosteller?",
    paragraph:
      "Our entire team is made up of avid travel junkies who scour destinations, offbeat experiences, trends and the internet to bring you the best of both worlds - budget travel and fulfilling experiences. Most of our travel team have jet-setted in and out of the country extensively and are quite experienced in terms of what backpacking truly is.\n Every trip or trek that we organize is like a glazed china bowl. It is made with love, care, affection and tenderness. Our travel team makes sure that you can have the most thrilling and memorable trips without having to undertake any of the planning pain. Trust us, sometimes planning is a pain. But for amazing travellers like you - we do it gladly.",
  },
  {
    heading: "What makes us different?",
    paragraph:
      "What differs us from others out there is our hip communal vibe of our backpacker hostels and pocket-friendly travel packages that allow for you to have an all-encompassing experience of the entire town/city.\n While staying with us - you will never feel alone. You can share some fries in the terrace cafe, exchange start up ideas in the common room, discuss ‘The Witcher’ theories while whipping up some pancakes in the common kitchen or simply laze around the bonfire areas. And in terms of local activities, we have it all. Whether it be mountain treks, bungee jumping, river rafting, food walks, photography walks, city pub crawls, game nights, movie nights, star gazing bonfires, overnight camping trips. With us, you can make the most out of your special backpacking trip.\n We pride ourselves on creating authentic experiences and friendships for our travellers, that stretch well beyond the vicinity of our hostels; and last well beyond the vicinity of your vacation. ",
  },
  // {
  //   heading: "Our Locations:",
  //   paragraph:
  //     "List of location hyperlinked to Hostel pages \n Now that you know all about us, how about you tell us a little about yourself? \n (here maybe there can be a form for subscription)",
  // },
];

const AboutUs = () => {
  return (
    <div>
      <div className='relative'>
        <div className='bg_mask absolute h-full w-full z-10 -mt-1'></div>
        <Carousel bannerImage={[bannerImage]} autoPlay={false} />
        <div className=' absolute w-full bottom-6 z-10'>
          <div className='view_container'>
            <h1 className='text-primary font-bold'>About Us</h1>
          </div>
        </div>
      </div>
      <div className='view_container mt-12'>
        <Meta title={"About Us"} description={"About Us"} />

        {aboutUs?.map((item) => (
          <div className='mt-8'>
            <h4 className='font-bold'>{item?.heading}</h4>
            <p className='mt-2'>{item?.paragraph}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
