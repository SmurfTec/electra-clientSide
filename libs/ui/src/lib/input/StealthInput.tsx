import { Chip, InputProps, MantineNumberSize, MantineSizes, NumberInputProps, Stack, TextareaProps } from '@mantine/core';
import { useEffect, useState } from 'react';
import { DeviceFloppy, Reload, X } from 'tabler-icons-react';

import { useClickOutside } from '@mantine/hooks';
import { IconButton } from '../iconbutton';
import { NumberInput } from '../number-input';
import { Only } from '../renderwhen';
import { Text } from '../text';
import { NumberFormat } from '../utils';

// type _OmitProps = {
//     value: TextareaProps['value'];
//     onChange: TextareaProps['onChange'];
// };

type StealthInputProps = NumberInputProps & {
    width?: number | string;
    initialValue?: number;
    title?: string;
    onClear?: (valueBeforeClear: number) => void;
    onReset?: (value: number) => void;
    onSave?: (value: number) => void;
    onInputChange?: (value: number) => void;
    canClear?: boolean;
    canReset?: boolean;
    canSave?: boolean;
    showTooltip?: boolean;
    textSize?: MantineNumberSize;
    stackClasses?: string;
};

StealthInput.defaultProps = {
    canClear: true,
    canReset: true,
    canSave: true,
    size: 'md',
    maxRows: 2,
    showTooltip: true,
};

export function StealthInput({
    initialValue,
    placeholder,
    title,
    label,
    width,
    size,
    onClear,
    onReset,
    onSave,
    onInputChange,
    canClear,
    canSave,
    canReset,
    showTooltip,
    textSize,
    stackClasses,
    ...rest
}: StealthInputProps) {
    const [value, setValue] = useState<number>(initialValue ?? 0);
    const [editMode, setEditMode] = useState<boolean>(false);

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
        setValue(0);
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
                <Only when={value === null || value === 0}>
                    <Chip className="cursor-pointer" size={'xs'} fs="italic" fz="xs">
                        {title || 'Click to edit'}
                    </Chip>
                </Only>
                <Text className="cursor-pointer text-ellipsis" size={textSize} lineClamp={2} {...getTooltipProps}>
                    {value === 0 ? null : NumberFormat(value)}
                </Text>
            </Only>

            <Only when={editMode}>
                <div className="w-full" ref={ref}>
                    <NumberInput
                        value={value}
                        min={0}
                        precision={0}
                        label={label}
                        placeholder={placeholder}
                        size={size}
                        onChange={(value) => {
                            setValue(Number(value));
                        }}
                        rightSection={
                            <Stack spacing={0} className={stackClasses}>
                                <IconButton
                                    icon={X}
                                    size={buttonSizes[size || 'sm']}
                                    tooltip="clear"
                                    onClick={handleClear}
                                />
                                <IconButton icon={Reload} size={size} tooltip="reset" onClick={handleReset} />
                                <IconButton
                                    icon={DeviceFloppy}
                                    size={size}
                                    tooltip="save"
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

