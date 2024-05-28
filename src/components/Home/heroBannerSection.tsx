import { ReactElement } from 'react'
import Button from '../Custom/Button'
import BlurPhoto from '../../assets/PhotoBlur.png'

export default function HeroBannerSection(): ReactElement {
  return (
    <section
      className={'flex w-full select-none justify-center bg-background-primary'}
    >
      <div
        className="h-164 relative flex items-center justify-between pl-36"
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
        <div className={'relative h-full w-1/2'}>
          <img
            src={BlurPhoto}
            alt="blurry background"
            className=" h-160 w-112 absolute bottom-0"
            style={{ filter: 'blur(1px)' }}
          />
        </div>
        <div className={'absolute bottom-8 left-12 flex items-center px-24'}>
          <div className={'space-y-1'}>
            <p className={'body-bold-default'}>Email</p>
            <p className={'body-small'}>bariteaupeter.tom@gmail.com</p>
          </div>
          <div className={'ml-8 mr-4 h-16 w-0.5 bg-neutral-white'} />
          <div className={'space-y-1'}>
            <p className={'body-bold-default'}>Phone</p>
            <p className={'body-small'}>(+33)6 67 57 06 24</p>
          </div>
          <div className={'ml-8 mr-4 h-16 w-0.5 bg-neutral-white'} />
          <div className={'space-y-1'}>
            <p className={'body-bold-default'}>Email</p>
            <p className={'body-small'}>Issy Les Moulineaux, France</p>
          </div>
        </div>
      </div>
    </section>
  )
}
