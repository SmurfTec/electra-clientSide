import { Chip, MantineNumberSize, MantineSizes, Stack, Textarea, TextareaProps } from '@mantine/core';
import { DeviceFloppy, Reload, X } from 'tabler-icons-react';
import { useEffect, useState } from 'react';

import { IconButton } from '../iconbutton';
import { Only } from '../renderwhen';
import { Text } from '../text';
import { useClickOutside } from '@mantine/hooks';

type _OmitProps = {
  value: TextareaProps['value'];
  onChange: TextareaProps['onChange'];
  minRows: TextareaProps['minRows'];
};

type StealthTextAreaProps = Omit<TextareaProps, keyof _OmitProps> & {
  width?: number | string;
  initialValue?: string;
  title?: string;
  onClear?: (valueBeforeClear: string) => void;
  onReset?: (value: string) => void;
  onSave?: (value: string) => void;
  onInputChange?: (value: string) => void;
  canClear?: boolean;
  canReset?: boolean;
  canSave?: boolean;
  showTooltip?: boolean;
  textSize?: MantineNumberSize;
};

StealthTextArea.defaultProps = {
  canClear: true,
  canReset: true,
  canSave: true,
  size: 'md',
  maxRows: 2,
  showTooltip: true,
};

export function StealthTextArea({
  initialValue,
  placeholder,
  title,
  label,
  width,
  size,
  maxRows,
  onClear,
  onReset,
  onSave,
  onInputChange,
  canClear,
  canSave,
  canReset,
  showTooltip,
  textSize,
  ...rest
}: StealthTextAreaProps) {
  const [value, setValue] = useState<string>(initialValue!);
  const [editMode, setEditMode] = useState<boolean>(false);

  const minRows = 3;

  const buttonSizes: Record<keyof MantineSizes, keyof MantineSizes> = {
    xs: 'sm',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'lg',
  };

  const ref = useClickOutside(() => {
    ref.current.blur();
    setEditMode(false);
  });

  useEffect(() => {
    if (onInputChange) onInputChange(value);
  }, [value]);

  //////////////// handlers ////////////////////////////

  function handleClear() {
    if (canClear && onClear) onClear(value);
    setValue('');
  }

  function handleReset() {
    if (canReset && onReset) onReset(value);
    setValue(initialValue!);
  }

  function handleSave() {
    if (canSave && onSave) onSave(value);
  }

  function getTooltipProps() {
    if (showTooltip)
      return {
        tooltip: value,
        position: 'right-start',
        width: 220,
      };
    return undefined;
  }

  //////////////// Component Logic //////////////////////////

  return (
    <div onClick={() => setEditMode(true)} className={'p-2'}>
      <Only when={!editMode}>
        <Only when={!value}>
          <Chip className="cursor-pointer" size={'xs'} fs="italic" fz="xs">
            {title || 'Click to edit'}
          </Chip>
        </Only>
        <Text className="cursor-pointer text-ellipsis" size={textSize} lineClamp={2} {...getTooltipProps}>
          {value}
        </Text>
      </Only>

      <Only when={editMode}>
        <div className="w-[100%]" ref={ref}>
          <Textarea
            value={value}
            label={label}
            placeholder={placeholder}
            minRows={minRows}
            maxRows={maxRows! < minRows ? minRows : maxRows!}
            size={size}
            onChange={(e) => {
              e.stopPropagation();
              setValue(e.target.value);
            }}
            rightSection={
              <Stack spacing={0}>
                <IconButton
                  icon={X}
                  size={buttonSizes[size || 'sm']}
                  tooltip="clear"
                  position="right-start"
                  onClick={handleClear}
                />
                <IconButton icon={Reload} size={size} tooltip="reset" position="right-start" onClick={handleReset} />
                <IconButton
                  icon={DeviceFloppy}
                  size={size}
                  tooltip="save"
                  position="right-start"
                  onClick={handleSave}
                />
              </Stack>
            }
            {...rest}
          />
        </div>
      </Only>
    </div>
  );
}