import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-powerplug';
import { Input } from '@uidu/inputs';

export default class SelectMembers extends PureComponent {
  isActive = (list, member, key = 'contactId') => {
    return (
      list
        .filter(this.listFilter)
        .map(m => m.contactId)
        .indexOf(member[key]) < 0
    );
  };

  listFilter = m => {
    const { withAssignment } = this.props;
    if (withAssignment) {
      return m.assignee;
    }
    return () => true;
  };

  render() {
    const {
      memberable,
      scope,
      organizationMembers,
      //
      withAssignment,
    } = this.props;

    return (
      <List
        initial={memberable.members.filter(this.listFilter).map(m => ({
          memberId: m.id,
          contactId: m.contactId,
          assignee: withAssignment && m.assignee,
        }))}
      >
        {({ list, pull, push }) => (
          <div>
            {list.map((contact, index) => (
              <div key={contact.contactId}>
                {contact.memberId && (
                  <Input
                    type="hidden"
                    name={`${scope}[members_attributes][${index}][id]`}
                    value={contact.memberId || ''}
                  />
                )}
                <Input
                  type="hidden"
                  name={`${scope}[members_attributes][${index}][member_type]`}
                  value="Contact"
                />
                <Input
                  type="hidden"
                  name={`${scope}[members_attributes][${index}][member_id]`}
                  value={contact.contactId || ''}
                />
                {withAssignment && (
                  <Input
                    type="hidden"
                    name={`${scope}[members_attributes][${index}][assignee]`}
                    value={contact.assignee || false}
                  />
                )}
              </div>
            ))}
            <div className="list-group list-group-flush mb-4">
              {memberable.members.filter(this.listFilter).map(member => (
                <div
                  className="list-group-item d-flex align-items-center justify-content-between"
                  key={member.id}
                >
                  <div className="d-flex align-items-center mr-auto">
                    <img
                      alt={member.name}
                      src={member.avatar.thumb}
                      style={{ width: 34, height: 34 }}
                      className="mr-2 rounded-circle"
                    />
                    <div className="mb-0">
                      {member.nickname ? (
                        <span>
                          {member.nickname}
                          <span className="small ml-2 text-muted">
                            {member.name}
                          </span>
                        </span>
                      ) : (
                        member.name
                      )}
                      {this.isActive(list, member) && (
                        <p className="small mb-0 text-muted">
                          Click save to remove {member.firstName}{' '}
                          <object>
                            <a
                              href="#"
                              onClick={e => {
                                e.preventDefault();
                                e.stopPropagation();
                                push({
                                  memberId: member.id,
                                  contactId: member.contactId,
                                  assignee: withAssignment && true,
                                }); // push member, should change id to contactId
                              }}
                            >
                              Undo
                            </a>
                          </object>
                        </p>
                      )}
                    </div>
                  </div>
                  {!this.isActive(list, member) && (
                    <button
                      className="btn btn-sm bg-light"
                      type="button"
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        pull(value => value.memberId === member.id);
                        withAssignment &&
                          push({
                            memberId: member.id,
                            contactId: member.contactId,
                            assignee: false,
                          });
                      }}
                    >
                      REMOVE
                    </button>
                  )}
                </div>
              ))}
              {organizationMembers
                .filter(
                  m =>
                    memberable.members
                      .filter(this.listFilter)
                      .map(mm => mm.contactId)
                      .indexOf(m.id) < 0,
                )
                .map(contact => (
                  <div
                    className="list-group-item d-flex align-items-center justify-content-between"
                    key={`selectable-${contact.id}`}
                  >
                    <div className="mr-auto d-flex align-items-center">
                      <img
                        alt={contact.name}
                        src={contact.avatar.thumb}
                        style={{ width: 34, height: 34 }}
                        className="mr-2 rounded-circle"
                      />
                      <div className="mb-0">
                        {contact.nickname ? (
                          <span>
                            {contact.nickname}
                            <span className="small ml-2 text-muted">
                              {contact.name}
                            </span>
                          </span>
                        ) : (
                          contact.name
                        )}
                        {!this.isActive(list, contact, 'id') && (
                          <p className="small mb-0 text-muted">
                            Click save to add {contact.firstName}{' '}
                            <object>
                              <a
                                href="#"
                                onClick={e => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  pull(value => value.contactId === contact.id);
                                }}
                              >
                                Undo
                              </a>
                            </object>
                          </p>
                        )}
                      </div>
                    </div>
                    {this.isActive(list, contact, 'id') && (
                      <button
                        className="btn btn-sm btn-tasks"
                        type="button"
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (
                            list.filter(l => l.contactId === contact.id)
                              .length > 0
                          ) {
                            const { memberId } = list.filter(
                              l => l.contactId === contact.id,
                            )[0];
                            pull(value => value.contactId === contact.id);
                            push({
                              memberId,
                              contactId: contact.id,
                              assignee: withAssignment && true,
                            });
                          } else {
                            push({
                              memberId: null,
                              contactId: contact.id,
                              assignee: withAssignment && true,
                            });
                          }
                        }}
                      >
                        ADD
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </List>
    );
  }
}

SelectMembers.propTypes = {
  memberable: PropTypes.shape(PropTypes.obj).isRequired,
  scope: PropTypes.string.isRequired,
  organizationMembers: PropTypes.arrayOf(PropTypes.object).isRequired,
  withAssignment: PropTypes.bool,
};

SelectMembers.defaultProps = {
  withAssignment: false,
};
