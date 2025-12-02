import { Button } from "./ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import {
    ZoomIn,
    ZoomOut,
    Palette,
    Keyboard,
    WrapText,
    Code2,
} from "lucide-react";

interface EditorControlsProps {
    fontSize: number;
    onFontSizeChange: (size: number) => void;
    theme: "light" | "dark";
    onThemeChange: (theme: "light" | "dark") => void;
    wordWrap: boolean;
    onWordWrapToggle: () => void;
    onFormat?: () => void;
}

export function EditorControls({
    fontSize,
    onFontSizeChange,
    theme,
    onThemeChange,
    wordWrap,
    onWordWrapToggle,
    onFormat,
}: EditorControlsProps) {
    const increaseFontSize = () => {
        if (fontSize < 24) onFontSizeChange(fontSize + 1);
    };

    const decreaseFontSize = () => {
        if (fontSize > 10) onFontSizeChange(fontSize - 1);
    };

    return (
        <div className="flex items-center gap-2 flex-wrap">
            {/* Font Size Controls */}
            <div className="flex items-center gap-1 border border-border rounded-md">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={decreaseFontSize}
                    disabled={fontSize <= 10}
                    className="h-8 px-2"
                    title="Decrease font size"
                >
                    <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-xs text-muted-foreground px-2 min-w-[3rem] text-center">
                    {fontSize}px
                </span>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={increaseFontSize}
                    disabled={fontSize >= 24}
                    className="h-8 px-2"
                    title="Increase font size"
                >
                    <ZoomIn className="w-4 h-4" />
                </Button>
            </div>

            {/* Theme Selector */}
            <Select value={theme} onValueChange={onThemeChange}>
                <SelectTrigger className="w-[120px] h-8">
                    <Palette className="w-4 h-4 mr-2" />
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
            </Select>

            {/* Word Wrap Toggle */}
            <Button
                variant={wordWrap ? "default" : "outline"}
                size="sm"
                onClick={onWordWrapToggle}
                className="h-8 gap-2"
                title="Toggle word wrap"
            >
                <WrapText className="w-4 h-4" />
                <span className="hidden sm:inline">Wrap</span>
            </Button>

            {/* Format Code Button */}
            {onFormat && (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onFormat}
                    className="h-8 gap-2"
                    title="Format code (Shift+Alt+F)"
                >
                    <Code2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Format</span>
                </Button>
            )}

            {/* Keyboard Shortcuts Hint */}
            <div className="hidden lg:flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                <Keyboard className="w-3 h-3" />
                <span>Ctrl+Enter to run</span>
            </div>
        </div>
    );
}
