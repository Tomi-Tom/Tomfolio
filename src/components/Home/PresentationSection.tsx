import { ReactElement } from 'react'
import Photo from '../../assets/PhotoPresentation.png'
import Button from '../Custom/Button'

export default function PresentationSection(): ReactElement {
  return (
    <section className={'flex select-none justify-center'}>
      <div
        className="relative flex h-180 px-32 py-24"
        style={{ width: '1440px' }}
      >
        <div className={'flex h-full w-156 overflow-hidden bg-orange-800'}>
          <img src={Photo} alt="presentation" />
        </div>
        <div
          className={
            'flex h-full w-full flex-col space-y-6 pl-20 text-neutral-white'
          }
        >
          <p className={'body-bold-default text-orange-800'}>Who am I?</p>
          <p className={'body-bold-large pb-1'}>
            I’m Tom Bariteau-Peter a visual UX/UI Designer and Web Developer
          </p>
          <p className={'body-small pb-6'}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            dapibus tortor faucibus, finibus ligula ut, commodo ligula. Cras a
            semper purus, ut vestibulum lectus. Quisque a sodales ex. Ut tempus,
            massa in commodo tincidunt, nisi ligula placerat eros, a malesuada
            lacus nibh ac arcu. Nulla efficitur, felis non gravida sodales,
            magna urna tincidunt sapien, non lacinia urna lacus sed mi.
            Pellentesque tempor risus ut scelerisque maximus.
          </p>
          <div className={'h-0.5 w-full bg-neutral-grey_1'} />
          <div className={'grid grid-cols-2 gap-4 py-5'}>
            <div className={'flex '}>
              <p className={'body-bold-small'}>Name:</p>
              <p className={'body-small ml-5'}>Tom Bariteau-Peter</p>
            </div>
            <div className={'flex '}>
              <p className={'body-bold-small'}>Email:</p>
              <p className={'body-small ml-8'}>bariteaupeter.tom@gmail.com</p>
            </div>
            <div className={'flex '}>
              <p className={'body-bold-small'}>Phone:</p>
              <p className={'body-small ml-4'}>(+33)6 67 57 06 24</p>
            </div>
            <div className={'flex '}>
              <p className={'body-bold-small'}>Location:</p>
              <p className={'body-small ml-4'}>Issy Les Moulineaux, France</p>
            </div>
          </div>
          <Button onClick={() => {}} small>
            <p className={'body-bold-default'}>Download CV</p>
          </Button>
        </div>
      </div>
    </section>
  )
}
