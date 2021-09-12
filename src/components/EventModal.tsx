import { IEvent, IParsedEvent } from '../libs/sanity/queries';
import Moment from 'react-moment';
import Link from './ui-components/Link';
import BlockContent from '@sanity/block-content-to-react';
import { Modal } from 'react-responsive-modal';
import moment from 'moment';
import { BsClock } from 'react-icons/bs';
import { GrDocumentVerified } from 'react-icons/gr';

interface IProps {
  currentEvent: IParsedEvent;
  onClose: () => void;
}

const EventModal = ({
  currentEvent: { start, end, links, title, description, type },
  onClose,
}: IProps): JSX.Element => {
  const isDifferentDate = Boolean(moment(start).diff(moment(end)));
  const isSameDay = moment(start).date() === moment(end).date();

  return (
    <Modal
      open
      onClose={onClose}
      center
      classNames={{
        modal: 'min-w-300 inline-flex flex-col gap-2',
      }}
    >
      <h1 className="pr-10">{title}</h1>
      {type?.label && type?.color && (
        <p className="flex gap-1 items-center">
          <GrDocumentVerified />
          <span
            className="underline"
            style={{
              textDecorationColor: type.color,
            }}
          >
            {type.label}
          </span>
        </p>
      )}
      {start && (
        <p className="flex flex-wrap gap-1 items-center">
          <BsClock />
          <Moment format="Do MMM hh:mm A">{start}</Moment>
          {isDifferentDate && (
            <>
              -{' '}
              {isSameDay ? (
                // same day
                <Moment format="hh:mm A">{end}</Moment>
              ) : (
                // different day
                <Moment format="Do MMM hh:mm A">{end}</Moment>
              )}
            </>
          )}
          (UTC)
        </p>
      )}
      {links?.length && (
        <>
          <hr />
          <ul className="list-disc list-inside">
            {links.map(({ label, url }) => {
              return (
                <li key={url}>
                  <Link href={url} label={label} />
                </li>
              );
            })}
          </ul>
        </>
      )}
      {description && (
        <>
          <hr />
          <BlockContent blocks={description} />
        </>
      )}
    </Modal>
  );
};

export default EventModal;
