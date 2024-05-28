import { ReactElement } from 'react'
import Button from '../Custom/Button'
import BlurPhoto from '../../assets/PhotoBlur.png'

export default function HeroBannerSection(): ReactElement {
  return (
    <section
      className={'flex w-full select-none justify-center bg-background-primary'}
    >
      <div
        className="relative flex h-164 items-center justify-between overflow-hidden pl-36 max-lg:px-8"
        style={{ width: '1440px' }}
      >
        <div className={'flex h-full flex-col'}>
          <div className={' flex h-full items-center'}>
            <div className={'h-2/3 space-y-2'}>
              <p className="body-large">Hi There</p>
              <h3 className="font-bold">I am Developer |</h3>
              <p className="body-large pb-3">I make the complex simple.</p>
              <Button onClick={() => {}} small>
                <p className={'body-bold-large'}>Contact Me</p>
              </Button>
            </div>
          </div>
        </div>
        <div className={'relative h-full w-1/2 max-lg:hidden'}>
          <img
            src={BlurPhoto}
            alt="blurry background"
            className=" absolute bottom-0 h-160 w-112 max-xl:right-0"
            style={{ filter: 'blur(1px)' }}
          />
        </div>
        <img
          src={BlurPhoto}
          alt="blurry background"
          className="absolute bottom-0 h-full opacity-65 lg:hidden"
          style={{ filter: 'blur(5px)' }}
        />
        <div
          className={
            'absolute bottom-8 left-12 flex items-center px-24 max-lg:left-8 max-lg:flex-col max-lg:items-start max-lg:space-y-4 max-lg:px-0'
          }
        >
          <div className={'space-y-1'}>
            <p className={'body-bold-default'}>Email</p>
            <p className={'body-small'}>bariteaupeter.tom@gmail.com</p>
          </div>
          <div
            className={
              'ml-8 mr-4 h-16 w-0.5 bg-neutral-white max-lg:m-0 max-lg:hidden'
            }
          />
          <div className={'space-y-1 '}>
            <p className={'body-bold-default'}>Phone</p>
            <p className={'body-small'}>(+33)6 67 57 06 24</p>
          </div>
          <div
            className={
              'ml-8 mr-4 h-16 w-0.5 bg-neutral-white max-lg:m-0 max-lg:hidden'
            }
          />
          <div className={'space-y-1'}>
            <p className={'body-bold-default'}>Email</p>
            <p className={'body-small'}>Issy Les Moulineaux, France</p>
          </div>
        </div>
      </div>
    </section>
  )
}
