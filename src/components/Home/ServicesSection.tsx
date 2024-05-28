import { ReactElement } from 'react'
import Services from '../../assets/SERVICES.png'
import WebDevelopmentIcon from '../../assets/Icons/WebDevelopment.svg'
import WebDesignIcon from '../../assets/Icons/WebDesign.svg'
import DesignTrendIcon from '../../assets/Icons/DesignTrend.svg'
import CustomerSupportIcon from '../../assets/Icons/CustomerSupport.svg'
import BrandingIcon from '../../assets/Icons/Branding.svg'
import SeoConsultantIcon from '../../assets/Icons/SEOConstultant.svg'

export default function ServicesSection(): ReactElement {
  const services = [
    {
      name: 'Web Development',
      description:
        'I will build your website from scratch using the latest technologies.',
      icon: WebDevelopmentIcon,
    },
    {
      name: 'Web Design',
      description:
        'I will design your website with the best user experience in mind.',
      icon: WebDesignIcon,
    },
    {
      name: 'Design Trend',
      description:
        'I will keep your website up to date with the latest design trends.',
      icon: DesignTrendIcon,
    },
    {
      name: 'Customer Support',
      description:
        'I will provide you with the best customer support after the project is done.',
      icon: CustomerSupportIcon,
    },
    {
      name: 'Branding',
      description:
        'I will help you build your brand identity and make it stand out.',
      icon: BrandingIcon,
    },
    {
      name: 'SEO Consultant',
      description:
        'I will help you optimize your website for search engines and get more traffic.',
      icon: SeoConsultantIcon,
    },
  ]
  return (
    <section className={'flex select-none justify-center'}>
      <div
        className=" relative flex flex-col justify-between overflow-hidden px-32 py-24 text-neutral-white max-lg:items-center max-lg:justify-center max-lg:px-0 max-lg:pb-24 max-sm:pb-8"
        style={{ width: '1440px' }}
      >
        <img
          src={Services}
          alt="services"
          className={'left-54 absolute top-14'}
        />
        <h3 className={'text-4xl font-bold '}>My Services</h3>
        <div className={'flex w-full items-center justify-center'}>
          <div
            className={
              'grid grid-cols-3 gap-8 py-32 max-xl:grid-cols-2 max-lg:pb-0 max-sm:grid-cols-1'
            }
          >
            {services.map((service, index) => (
              <div
                key={index}
                className={
                  'flex h-64 w-96 rounded-lg bg-background-secondary shadow-lg transition-all duration-300 hover:translate-y-3 hover:bg-orange-900 hover:shadow-none max-lg:w-80'
                }
              >
                <div
                  className={
                    'text flex flex-col items-start justify-center p-12 '
                  }
                >
                  <img src={service.icon} alt="icon" width={78} height={78} />
                  <h4 className={'body-bold-large'}>{service.name}</h4>
                  <p className={'body-small pt-4'}>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
